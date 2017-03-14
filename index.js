/**
 * Oracle Bone Server
 */

const port = 3001;
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/oracle');

const db = mongoose.connection;

db.on('error', (msg) => {
  console.log(msg);
});

db.once('open', () => {
  console.log('db connected successfully');
});

const Component = mongoose.model('component', new Schema({
  number: Number
}));

const CharacterSchema = new Schema({
  number: Number,
  components: [Number],
  fontCode: {
    type: String,
    trim: true
  },
  variantCount: Number,
  translations: [{
    name: String,
    pinyin: String,
    strokeCount: Number,
    variantNo: Number
  }],
  meanings: [String]
});

CharacterSchema.set('toJSON', {
  transform: function (doc, result, options) {

    result.translationTexts = result.translations
      .map(translation => translation.name)
      .filter((translation, i, array) => translation && (array.indexOf(translation) === i));

    return result;
  }
});


const Character = mongoose.model('character', CharacterSchema);


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/api/components', (req, res, next) => {

  Component.find({}, null, {
    sort: 'number'
  }, (err, components) => {
    if (err) console.error(err);

    const componentNumbers = components.map(component => component.number);

    Character.find({
      number: {
        $in: componentNumbers
      }
    }, null, {
      sort: 'number'
    }, (err, characters) => {
      if (err) console.error(err);

      err
        ? res.sendStatus(400)
        : res.json(characters);
    });
  });
});

app.get('/api/components/:number', (req, res, next) => {
  const componentNumber = +req.params.number;

  Character.find({
    $or: [{
      components: {
        $all: [componentNumber]
      }
    }, {
      number: componentNumber
    }]
  }, null, {
    sort: 'number'
  }, (err, characters) => {
    if (err) console.error(err);

    err
      ? res.sendStatus(400)
      : res.json({
          component: characters.find(char => char.number === componentNumber),
          characters
        });
  });
});

app.post('/api/components', (req, res, next) => {
  const record = new Component(req.body);

  record.save((err) => {
    if (err) console.error(err);

    res.sendStatus(err ? 400 : 200);
  });
});

app.put('/api/components/:number/chars', (req, res, next) => {
  const chars = (req.body.chars || []).filter(char => char);
  const componentNumber = +req.params.number;

  Character.find({
    number: {
      $in: chars
    }
  }, null, (err, characters) => {
    if (err) console.error(err);

    characters.forEach(char => {
      if (char.components.indexOf(componentNumber) !== -1) return;

      char.components.push(componentNumber);
      char.components.sort((a, b) => a - b);

      char.save();
    });

    res.sendStatus(err ? 400 : 200);
  });
});

app.get('/api/characters', (req, res, next) => {
  const query = req.query;

  if (!Object.keys(query).length) {

    Character.find({
      // 'fontCode': {
      //   $exists: true
      // }
    }, null, {
      sort: 'number'
    }, (err, characters) => {
      if (err) console.error(err);

      err
        ? res.sendStatus(400)
        : res.json(characters);
    });
  } else {

    if (query.components) {

      Character.find({
        components: {
          $all: query.components.split(',').map(component => +component)
        }
      }, null, {
        sort: 'number'
      }, (err, characters) => {
        if (err) console.error(err);

        err
          ? res.sendStatus(400)
          : res.json(characters);
      });
    }
  }
});

app.get('/api/characters/:number', (req, res, next) => {

  Character.findOne({
    number: req.params.number
  }, (err, character) => {
    if (err) console.error(err);

    err
      ? res.sendStatus(400)
      : res.json(character);
  });
});

app.put('/api/characters/:number', (req, res, next) => {
  const character = req.body;

  character.components = character.components.map(component => component.value).filter(item => item);
  character.translations = character.translations.filter(trans => trans.name || trans.variantNo);
  character.meanings = character.meanings.map(meaning => meaning.value).filter(item => item);

  Character.findOneAndUpdate({
    number: req.params.number
  }, req.body, (err, character) => {
    if (err) console.error(err);

    err
      ? res.sendStatus(400)
      : res.json(character);
  });
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
    return process.exit(1);
  } else {
    console.log('Listening on port: ' + port + '.');
  }
});
