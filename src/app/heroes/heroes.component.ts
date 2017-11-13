import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass'],
})
export class HeroesComponent implements OnInit {
  private _heroes: Hero[];
  private _selectedHero: Hero;

  get selectedHero(): Hero { return this._selectedHero; }
  get heroes$(): Observable<Hero[]> { return of(this._heroes); }

  constructor(private heroService: HeroService) { }

  selectHero = (hero: Hero) => {
    this._selectedHero = hero;
  }

  saveHero = (name: string): void => {
    name = name.trim();
    if (name === '') { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe((hero: Hero) => this._heroes.push(hero));
  }

  deleteHero = (hero: Hero) => {
    this.heroService.removeHero(hero)
      .subscribe(_ => this._heroes = this._heroes.filter(h => h.id !== hero.id));
  }

  ngOnInit() {
    this._heroes = [];
    this.heroService.getHeroes()
      .subscribe((heroes: Hero[]) => this._heroes = heroes);
  }
}
