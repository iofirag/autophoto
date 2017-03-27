import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserDataService, UserInterface } from '../../providers/user-data.service';
/*
  Generated class for the Account page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/


@Component({
  selector: 'page-account',
  templateUrl: 'account.component.html'
})
export class AccountPage {

  profile: UserInterface

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public userDataService: UserDataService
  ) {
  	this.userDataService.getUser().then((profileStored)=>{
  		this.profile = profileStored;
  	})
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad AccountPage');
  // }

}
