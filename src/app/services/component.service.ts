/**
 * Created by Ash on 2016-11-11.
 */

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';

import { CharacterModel } from '../models/character.model';
import { ComponentModel } from '../models/component.model';

@Injectable()
export class ComponentService {
  private url = 'api/components';
  private headers = {
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: Http
  ) { }

  create(data: Object): Observable<any> {
    return this.http
      .post(this.url, JSON.stringify(data), this.headers)
      .catch(this.handleError);
  }

  get(number: number): Observable<{component: ComponentModel, characters: CharacterModel[]}> {
    return this.http
      .get(`${this.url}/${number}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getList(): Observable<ComponentModel[]> {
    return this.http
      .get(this.url)
      .map(res => res.json() as ComponentModel[])
      .catch(this.handleError);
  }

  saveComponentChars(number: number, chars: number[]): void {
    const data = JSON.stringify({ chars });

    this.http
      .put(`${this.url}/${number}/chars`, data, this.headers)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An Error occurred', error);
    return Promise.reject(error.message || error);
  }
}
