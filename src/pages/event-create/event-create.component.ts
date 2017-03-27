// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Component } from '@angular/core';
import { NavController, NavParams ,Events, MenuController, LoadingController } from 'ionic-angular';


import { DataService } from '../../providers/data.service';
import { UserDataService } from '../../providers/user-data.service';
/*
  Generated class for the EventCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.component.html'
})
export class EventCreatePage {

	newEvent: any
  	constructor(
	  	public dataService: DataService,
	  	public loadingCtrl: LoadingController,
	  	public userDataService: UserDataService
	  	//public navCtrl: NavController, 
	  	//public navParams: NavParams,
	  	//public http: Http
	  	) { 
	  	this.newEvent = {
	  		title: '',
	  		description: '',
	  		location: {long:0,lat:0},
	  		coverPictureUrl: '',
	  		createdBy: ''
	  	}
	  	this.userDataService.getUser().then(
			val=>{
				console.log('EventCreatePage - constructor',val)
				this.newEvent.createdBy = val.fbaseId
			},err=>{
				console.log('err',err)
			})
  	}


  createEvent(): void{
  	let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    

  	this.newEvent.location = {long:11.5 ,lat:22.4}
  	console.log(this.newEvent)
  	if (this.newEvent.title && this.newEvent.description 
  		&& this.newEvent.location && this.newEvent.coverPictureUrl
  		){
  		loading.present();
  		this.dataService.createEvent(this.newEvent)
  		.map(mapRes=>mapRes.json())// get body data
  		.subscribe((res)=>{
  			if (res.success==1){
  				console.log('firebaseEventId',res.data.firebaseEventId)
  				// save return firebaseEventId as active event
  				this.userDataService.setActiveEvent(res.data.firebaseEventId)
  			}
  		},err=>{
  			console.log(err)
  		},()=>{
  			loading.dismiss()
  		})
  	}else{
  		alert('Please provide all event fields')
  	}
  	//return new Observable(()=>{})
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EventCreatePage');
  }

}
