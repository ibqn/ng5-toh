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
  heroes: Observable<Hero[]>;
  selectedHero: Hero;

  constructor(private heroService: HeroService) { }

  selectHero = (hero: Hero) => {
    this.selectedHero = hero;
  }

  ngOnInit() {
    this.heroes = this.heroService.getHeroes();
  }
}
