import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.sass'],
})
export class HeroSearchComponent implements OnInit {
  private _heroes: Observable<Hero[]>;
  private _searchTerms: Subject<string>;

  get heroes$(): Observable<Hero[]> { return this._heroes; }

  search = (term: string): void => {
    this._searchTerms.next(term);
  }

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this._searchTerms = new Subject<string>();

    this._heroes = this._searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap(
        (term: string): Observable<Hero[]> => this.heroService.searchHero(term)
      ),
    );
  }
}
