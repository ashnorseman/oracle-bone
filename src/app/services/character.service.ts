/**
 * Created by Ash on 2016-11-11.
 */

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';

import { CharacterModel } from '../models/character.model';

@Injectable()
export class CharacterService {
  private url = 'api/characters';
  private headers = {
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: Http
  ) { }

  get(number: number): Observable<CharacterModel> {
    return this.http
      .get(`${this.url}/${number}`)
      .map(character => character.json() as CharacterModel)
      .catch(this.handleError);
  }

  getList(queryStr?: string): Observable<CharacterModel[]> {
    const options = queryStr ? {
      search: queryStr
    } : null;

    return this.http
      .get(this.url, options)
      .map(res => res.json() as CharacterModel[])
      .catch(this.handleError);
  }

  update(character: CharacterModel): Observable<any> {
    return this.http
      .put(`${this.url}/${character.number}`, JSON.stringify(character), this.headers)
      .catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    console.error('An Error occurred', error);
    return Observable.throw(error.message || error);
  }
}
