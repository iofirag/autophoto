import { Component } from '@angular/core';
import { MenuController, NavController, Slides, Events } from 'ionic-angular';
// import { Storage } from '@ionic/storage';
// import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login.component';

import { UserDataService } from '../../providers/user-data.service';

/*
  Generated class for the Tutorial page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.component.html'
})

export class TutorialPage {
  showSkip = true;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    // public storage: Storage,
    public events: Events,
    public userDataService: UserDataService
  ) { }

  startApp() {
    // this.navCtrl.push(LoginPage).then(() => {
      this.userDataService.setHasSeenTutorial(true)
      
    // })
    // this.navCtrl.setRoot(LoginPage).catch(() => {
    //     console.log("Didn't set nav root");
    //   });
    // this.nav.setRoot(page.component).catch(() => {
    //     console.log("Didn't set nav root");
    //   });
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    console.log('ionViewDidEnter')  
    this.menu.enable(false);  //dont really needed
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    console.log('ionViewDidLeave')
    this.menu.enable(true);  //dont really needed
  }

}

