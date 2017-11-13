import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService) { }

  selectHero = (hero: Hero) => {
    this.selectedHero = hero;
  }

  saveHero = (name: string): void => {
    name = name.trim();
    if (name === '') { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe((hero: Hero) => this.heroes.push(hero));
  }

  deleteHero = (hero: Hero) => {
    this.heroService.removeHero(hero)
      .subscribe(_ => this.heroes = this.heroes.filter(h => h.id !== hero.id));
  }


  ngOnInit() {
    this.heroes = [];
    this.heroService.getHeroes()
      .subscribe((heroes: Hero[]) => this.heroes = heroes);
  }
}
