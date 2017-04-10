var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { MenuController, NavController, Events } from 'ionic-angular';
import { UserDataService } from '../../providers/user-data.service';
/*
  Generated class for the Tutorial page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var TutorialPage = (function () {
    function TutorialPage(navCtrl, menu, 
        // public storage: Storage,
        events, userDataService) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.events = events;
        this.userDataService = userDataService;
        this.showSkip = true;
    }
    TutorialPage.prototype.startApp = function () {
        // this.navCtrl.push(LoginPage).then(() => {
        this.userDataService.setHasSeenTutorial(true);
        // })
        // this.navCtrl.setRoot(LoginPage).catch(() => {
        //     console.log("Didn't set nav root");
        //   });
        // this.nav.setRoot(page.component).catch(() => {
        //     console.log("Didn't set nav root");
        //   });
    };
    TutorialPage.prototype.onSlideChangeStart = function (slider) {
        this.showSkip = !slider.isEnd();
    };
    TutorialPage.prototype.ionViewDidEnter = function () {
        // the root left menu should be disabled on the tutorial page
        console.log('ionViewDidEnter');
        this.menu.enable(false); //dont really needed
    };
    TutorialPage.prototype.ionViewDidLeave = function () {
        // enable the root left menu when leaving the tutorial page
        console.log('ionViewDidLeave');
        this.menu.enable(true); //dont really needed
    };
    return TutorialPage;
}());
TutorialPage = __decorate([
    Component({
        selector: 'page-tutorial',
        templateUrl: 'tutorial.component.html'
    }),
    __metadata("design:paramtypes", [NavController,
        MenuController,
        Events,
        UserDataService])
], TutorialPage);
export { TutorialPage };
//# sourceMappingURL=tutorial.component.js.map