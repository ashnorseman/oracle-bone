/**
 * App Routing Module
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharacterDetailComponent } from "./components/character-detail/character-detail.component";
import { CharactersComponent } from "./components/characters/characters.component";
import { ComponentDetailComponent } from "./components/component-detail/component-detail.component";
import { ComponentsComponent } from "./components/components/components.component";
import { SearchComponent } from "./components/search/search.component";

const routes: Routes = [
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'components',
    component: ComponentsComponent
  },
  {
    path: 'components/:number',
    component: ComponentDetailComponent
  },
  {
    path: 'characters',
    component: CharactersComponent
  },
  {
    path: 'characters/:number',
    component: CharacterDetailComponent
  },
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
