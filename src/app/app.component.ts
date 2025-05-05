import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import { pulse, shakeX } from 'ng-animate';

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
        useAnimation(pulse, { params: { timing: 0.3, scale: 4.5} }),
        // useAnimation( /* Code de la deuxième animation */ ),
      ])
    ]),
    ]
})
export class AppComponent {
  slimeIsPresent = false;
  ng_death = false;
  ng_attack = false;

  constructor() {
  }

  spawn() {
    this.slimeIsPresent = true;
    this.ng_death = false;
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
}
