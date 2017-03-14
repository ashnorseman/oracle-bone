/**
 * App Module
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { CharacterService } from './services/character.service';
import { ComponentService } from './services/component.service';

import { AppComponent } from './app.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { CharactersComponent } from './components/characters/characters.component';
import { ComponentDetailComponent } from './components/component-detail/component-detail.component';
import { ComponentsComponent } from './components/components/components.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterDetailComponent,
    CharactersComponent,
    ComponentDetailComponent,
    ComponentsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    CharacterService,
    ComponentService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
