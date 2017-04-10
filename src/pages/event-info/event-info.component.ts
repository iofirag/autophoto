import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { DataService } from '../../providers/data.service';
import { UserDataService } from '../../providers/user-data.service';


@Component({
  selector: 'page-event-info',
  templateUrl: 'event-info.component.html'
})
export class EventInfoPage {

	eventData: any;
	userProfile: any;
	photosCunter: number;
	usersJoinedCunter: number;
	hasJoinedBefore: boolean;
	tempGroupUsers: Array<any>

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public dataService: DataService,
	  	public loadingCtrl: LoadingController,
	  	public userDataService: UserDataService
		) {
		// Get event details
		this.eventData = this.navParams.get('eventParams')

		// Check if user has joined before
		//this.checkForUserExistence()
		// init photos and participant counters
		this.initCounters()
		
	}

	initCounters(): void {
		this.photosCunter = 0;
		this.usersJoinedCunter = 0;

		this.initPhotosCounter()
		this.initGroupUsersCunter()
	}
	initPhotosCounter(): void{
		this.dataService.getGalleryDataByEventGalleryId(this.eventData.galleryId).map(mapRes=>mapRes.json())
	  		.subscribe(// get body data
	  			(galleryDataRes:any)=>{

	  				if (galleryDataRes.success>0){
		  				if (galleryDataRes.data){
		  					this.photosCunter = Object.keys(galleryDataRes.data).length
		  				}else{
		  					alert('No data to show')
		  				}
	  				}else{
	  					alert('Error: get gallery data fail')
	  				}
				},err=>{
					console.log('getGalleryDataByEventGalleryId()',err)
				})
	}
	initGroupUsersCunter(): void{
		this.dataService.getGroupUsers(this.eventData.groupId).map(mapRes=>mapRes.json())
	  		.subscribe(// get body data
	  			(groupUsersRes:any)=>{
	  				if (groupUsersRes.success>0){
		  				if (groupUsersRes.data){
		  					this.usersJoinedCunter = Object.keys(groupUsersRes.data).length
		  					// Set button Join or Open
		  					this.tempGroupUsers = groupUsersRes.data
		  					this.checkForUserExistence()
		  				}else{
		  					alert('No data to show')
		  				}
	  				}else{
	  					alert('Error: get gallery data fail')
	  				}
				},err=>{
					console.log('getGalleryDataByEventGalleryId()',err)
				})
	}
	checkForUserExistence(): void {
		this.userDataService.getUser().then(
  		val=>{
  			console.log('EventInfoPage - constructor',val)
  			this.userProfile = val

  			this.hasJoinedBefore = false;
  			if (this.userProfile.firebaseId && this.tempGroupUsers){
	  			
	  			this.hasJoinedBefore = (this.userProfile.firebaseId in this.tempGroupUsers)
  			}
  		},err=>{
  			console.log('err',err)
  		})
	}
	joinToEvent() {
		let loading = this.loadingCtrl.create({
	      content: 'Please wait...'
	    })
	    loading.present();
	    this.dataService.insertUserIdToGroup(this.eventData.groupId, this.userProfile.firebaseId)
  		.map(mapRes=>mapRes.json())// get body data
  		.subscribe((res)=>{
  			if (res.success==1){
  				this.userDataService.setActiveEvent(this.eventData)
  			}
  		},err=>{
  			console.log(err)
  			loading.dismiss()
  		},()=>{
  			loading.dismiss()
  		})
	}
	open() {
		this.userDataService.setActiveEvent(this.eventData)
	}
  	ionViewDidLoad() {
		console.log('ionViewDidLoad EventInfoPage');
  	}

}
