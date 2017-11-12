import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  private _heroes: Hero[];

  get heroes() { return this._heroes; }

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getHeroes()
      .subscribe(heroes => this._heroes = heroes.slice(0, 4));
  }
}
