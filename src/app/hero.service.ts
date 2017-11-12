import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { MessageService } from './message.service';


@Injectable()
export class HeroService {
  private heroesUrl = 'http://localhost:8000/api/hero/';

  getHeroes = (): Observable<Hero[]> => {
    this.log('fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      map(res => res['result'])
    );
    // return of(HEROES);
  }

  getHero = (id: string): Observable<Hero> => {
    this.log(`fetched hero with id ${id}`);
    // return of(HEROES.find(hero => hero.id === id));
    return this.http.get<Hero[]>(`${this.heroesUrl}/${id}`).pipe(
      map(res => res['result'])
    );
  }

  private log(message: string): void {
    this.messageService.add(`Hero Service: ${message}`);
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

}
