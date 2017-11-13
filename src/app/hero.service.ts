import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from './hero';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';


@Injectable()
export class HeroService {
  private heroesUrl = 'http://localhost:8000/api/hero/';
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  searchHero = (term: string): Observable<Hero[]> => {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/search/${term}`).pipe(
      map(res => res['result'] as Hero[]),
      tap(_ => this.log(`found heroes matching "${term}"`)),
    );
  }

  getHeroes = (): Observable<Hero[]> => {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      map(res => res['result'] as Hero[]),
      tap(_ => this.log('fetched heroes')),
    );
  }

  getHero = (id: string): Observable<Hero> => {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      map(res => res['result'] as Hero),
      tap(_ => this.log(`fetched hero with id ${id}`)),
    );
  }

  addHero = (hero: Hero): Observable<Hero> => {
    return this.http.post<Hero>(`${this.heroesUrl}`, hero, this.httpOptions).pipe(
      map(res => res['result'] as Hero),
      tap((newHero: Hero) => this.log(`added new hero with id ${newHero.id}`)),
    );
  }

  updateHero = (hero: Hero): Observable<Hero> => {
    return this.http.put<Hero>(`${this.heroesUrl}/${hero.id}`, hero, this.httpOptions).pipe(
      map(res => res['result'] as Hero),
      tap(_ => this.log(`updated hero with id ${hero.id}`)),
    );
  }

  removeHero = (hero: Hero): Observable<any> => {
    return this.http.delete(`${this.heroesUrl}/${hero.id}`).pipe(
      tap(_ => this.log(`removed hero with id ${hero.id}`)),
    );
  }

  private log(message: string): void {
    this.messageService.add(`Hero Service: ${message}`);
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
}
