import { Component } from '@angular/core';
import { NavController, NavParams ,Events, MenuController, LoadingController } from 'ionic-angular';

import { DataService } from '../../providers/data.service';
import { UserDataService } from '../../providers/user-data.service';


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
  	) { 
  	this.newEvent = {
      createdBy: '',
      location: {long:0,lat:0},
      title: '',
      description: '',
  		coverPictureUrl: ''
  	}
  	this.userDataService.getUser().then(
  		val=>{
  			console.log('EventCreatePage - constructor',val)
  			this.newEvent.createdBy = val.firebaseId
  		},err=>{
  			console.log('err',err)
  		})
	}


  createEvent(): void{
  	let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })

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
  				this.userDataService.setActiveEvent(res.data)
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
