import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {Hero} from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.sass'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  private _route: boolean;

  get route(): boolean { return this._route; }

  constructor(
    private heroService: HeroService,
    private location: Location,
    private activatedRoute: ActivatedRoute) { }

  goBack = (): void => this.location.back();

  ngOnInit() {
    const id: number = +this.activatedRoute.snapshot.paramMap.get('id') || -1;
    this._route = id >= 0;
    if (this._route) {
      this.heroService.getHero(id).subscribe(hero => this.hero = hero);
    }
  }
}
