/**
 * Component Detail
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ComponentModel } from '../../models/component.model';
import { CharacterModel } from '../../models/character.model';
import { ComponentService } from '../../services/component.service';

@Component({
  moduleId: module.id,
  selector: 'o-component-detail',
  templateUrl: 'component-detail.component.html',
  styleUrls: [ 'component-detail.component.scss' ]
})
export class ComponentDetailComponent implements OnInit {
  component: ComponentModel;
  characters: CharacterModel[];
  componentChars: string;

  constructor(
    private componentService: ComponentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.component = <ComponentModel>{
      translationTexts: []
    };

    this.route.params.forEach((params: Params) => {

      this.componentService
        .get(params['number'])
        .subscribe(res => {
          this.component = res.component;
          this.characters = res.characters;
          this.componentChars = res.characters.map(char => char.number).join('\n');
        });
    });
  }

  saveComponentChars(): void {
    const componentChars = this.componentChars.split('\n').map(char => {
      if (char.indexOf('-') === -1) return [+char];

      let first = +char.split('-')[0];
      const last = +char.split('-')[1];
      const result = [];

      while (first <= last) {
        result.push(first);
        first += 1;
      }

      return result;
    }).reduce((a, b) => a.concat(b));

    this.componentService.saveComponentChars(this.component.number, componentChars);
  }
}
