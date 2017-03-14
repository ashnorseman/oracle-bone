/**
 * Search Component
 */

import { Component, OnInit } from '@angular/core';

import { CharacterModel } from '../../models/character.model';
import { ComponentModel } from '../../models/component.model';
import { CharacterService } from '../../services/character.service';
import { ComponentService } from '../../services/component.service';

@Component({
  moduleId: module.id,
  selector: 'o-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css']
})
export class SearchComponent implements OnInit {
  characters: CharacterModel[];
  components: ComponentModel[];
  queryComponentNumbers: number[] = [];

  constructor(
    private characterService: CharacterService,
    private componentService: ComponentService
  ) { }

  ngOnInit(): void {
    this.componentService
      .getList()
      .subscribe(components => this.components = components);
  }

  clearComponents(): void {
    this.queryComponentNumbers = [];
    this.characters = [];
  }

  toggleComponent(componentNumber: number): void {
    const index = this.queryComponentNumbers.indexOf(componentNumber);

    if (index === -1) {
      this.queryComponentNumbers.push(componentNumber);
    } else {
      this.queryComponentNumbers.splice(index, 1);
    }

    if (!this.queryComponentNumbers.length) {
      this.characters = [];
      return;
    }

    const queryStr = this.queryComponentNumbers.length
      ? `components=${this.queryComponentNumbers.join(',')}`
      : '';

    this.characterService
      .getList(queryStr)
      .subscribe(characters => this.characters = characters);
  }
}
