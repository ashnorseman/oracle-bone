/**
 * Character Detail
 */

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CharacterModel } from '../../models/character.model';
import { CharacterService } from '../../services/character.service';

@Component({
  moduleId: module.id,
  selector: 'o-character-detail',
  templateUrl: 'character-detail.component.html',
  styleUrls: [ 'character-detail.component.scss' ]
})
export class CharacterDetailComponent implements OnInit {
  @Input() char: CharacterModel;
  @ViewChild('variantCount') variantCount;

  private defaultChar = {
    components: [{}],
    translations: [{}],
    meanings: [{}]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService
  ) { }

  ngOnInit(): void {
    this.char = <CharacterModel>this.defaultChar;

    this.route.params.forEach((params: Params) => {

      this.characterService
        .getList()
        .subscribe((chars) => {
          this.characterService
            .get(params['number'])
            .subscribe(char => {
              if (!char.translations.length) char.translations.push({});
              if (!char.meanings.length) char.meanings.push({});

              char.components = char.components.map(comp => {
                const char = chars.find(c => c.number === comp);

                if (!char) {
                  console.log(comp);
                }

                return {
                  value: comp,
                  fontCode: char ? char.fontCode : null
                };
              });

              this.char = char;

              this.variantCount.nativeElement.focus();
            });
        });
    });
  }

  addMeaning(): void {
    this.char.meanings.push({});
  }

  addTrans(): void {
    this.char.translations.push({});
  }

  editCharacter($event: any): void {
    $event.preventDefault();

    this.characterService
      .update(this.char)
      .subscribe(() => this.router.navigate(['/characters', this.char.number + 1]));
  }

  removeMeaning(i: number): void {
    this.char.meanings.splice(i, 1);
  }

  removeTrans(i: number): void {
    this.char.translations.splice(i, 1);
  }
}
