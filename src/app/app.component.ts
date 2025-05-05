import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import { bounce, flip, pulse, shakeX } from 'ng-animate';
import { lastValueFrom, timer } from 'rxjs';

const DEATH_DURATION_SECONDS = 0.5
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger("death", [
      transition(
        "* => true",[
          useAnimation(shakeX, { params: { timing: DEATH_DURATION_SECONDS } })
        ])
    ]),
    trigger('attack', [
      transition('* => true', [
        useAnimation( shakeX, { params: { timing: DEATH_DURATION_SECONDS } } ),
        useAnimation(pulse, { params: { timing: 0.3, scale: 4.5} }),
      ])
    ]),
    trigger('bounce', [
      transition('* => true', [
        useAnimation(bounce, { params: { timing: 1} })
      ])
    ]),
    trigger('shake', [
      transition('* => true', [
        useAnimation( shakeX, { params: { timing: 0.75 } } ),
      ])
    ]),
    trigger('flip', [
      transition('* => true', [
        useAnimation(flip, { params: { timing: 0.75} })
      ])
    ]),
    
    ]
})
export class AppComponent {
  slimeIsPresent = false;
  ng_death = false;
  ng_attack = false;
  css_hit = false;
  ng_bounce = false;
  ng_shake = false;
  ng_flip = false;
  css_rotate = false;
  css_rotatetop = false;
  keepPlayingAnimation: any;
  constructor() {
  }

  spawn() {
    this.slimeIsPresent = true;
    this.ng_death = false;
    this.ng_bounce = false;
    this.ng_shake = false;
    this.ng_flip = false;
    this.css_rotate = false;
    this.css_rotatetop = false;
    // TODO Animation angular avec forwards
    this.showSlime()
  }

  death(){
    this.slimeIsPresent = false;
    // TODO Animation angular avec forwards  
    this.ng_death = true;
    setTimeout(() => {this.ng_death = false;}, 1000);
    // TODO 2e animation angular en même temps  
    this.hideSlime()

  }

  attack(){
    // TODO Jouer une animation et augmenter l'intensité du mouvement avec scale
    this.ng_attack = true;
    setTimeout(() => {this.ng_attack = false;}, 1000);

    // TODO Jouer une autre animation avant
  }

  hit(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
    this.css_hit = true;
    setTimeout(() => {this.css_hit = false;}, 1000);

  }

  showSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeOut");
    element?.classList.add("fadeIn");
}

  hideSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeIn");
    element?.classList.add("fadeOut");
  }

  async BSF(){    
    this.ng_bounce = true;
    await this.waitFor(1, this.ng_bounce);
    this.ng_shake = true;
    await this.waitFor(1, this.ng_shake);
    this.ng_flip = true;
    await this.waitFor(1, this.ng_flip);

  }

  ITS(){
    this.playRotate();
  }

  playRotate() {
    this.css_rotate = true;
    setTimeout(() => {
      this.css_rotate = false;
      this.playRotateTop();
    },2000);
  }

  playRotateTop() {
    this.css_rotatetop = true;
    setTimeout(() => {
      this.css_rotatetop = false;
      this.playRotate();
    },1000);
  }

  async waitFor(delayInSeconds:number, animation : boolean) {
    animation = false;
    await lastValueFrom(timer(delayInSeconds * 1000));
  }
}
