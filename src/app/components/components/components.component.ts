/**
 * Components component
 */

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ComponentModel } from '../../models/component.model';
import { ComponentService } from '../../services/component.service';

@Component({
  moduleId: module.id,
  selector: 'o-components',
  templateUrl: 'components.component.html',
  styleUrls: [ 'components.component.scss' ]
})
export class ComponentsComponent implements OnInit {
  components: ComponentModel[];

  constructor(
    private componentService: ComponentService
  ) { }

  ngOnInit(): void {
    this.getComponents();
  }

  addComponent(componentForm: NgForm, $event: any): void {
    $event.preventDefault();

    const data = componentForm.value;

    this.componentService.create(data);
    this.components.push(data);

    componentForm.resetForm();
  }

  getComponents(): void {
    this.componentService
      .getList()
      .subscribe(components => this.components = components);
  }
}
