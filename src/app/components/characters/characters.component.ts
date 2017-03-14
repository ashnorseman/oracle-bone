/**
 * Character Component
 */

import { Component, OnInit } from '@angular/core';

import { CharacterModel } from '../../models/character.model';
import { CharacterService } from '../../services/character.service';

@Component({
  moduleId: module.id,
  selector: 'o-characters',
  templateUrl: 'characters.component.html',
  styleUrls: [ 'characters.component.scss' ]
})
export class CharactersComponent implements OnInit {
  characters: CharacterModel[] = [];

  constructor(
    private characterService: CharacterService
  ) { }

  ngOnInit(): void {
    this.characterService
      .getList()
      .subscribe(characters => this.characters = characters);
  }
}
