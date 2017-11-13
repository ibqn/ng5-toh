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

  update = (): void => {
    this.heroService.updateHero(this.hero)
      .subscribe(_ => {
        if (this._route) {
          this.location.back();
        }
      });
  }

  ngOnInit() {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id') || undefined;
    this._route = id !== undefined;
    if (this._route) {
      this.heroService.getHero(id)
        .subscribe((hero: Hero) => this.hero = hero);
    }
  }
}
