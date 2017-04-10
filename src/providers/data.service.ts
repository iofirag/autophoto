import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { LoadingController } from 'ionic-angular';

import { Injectable } from '@angular/core';

import { UserDataService } from './user-data.service';


export interface UserInterface {
    email: string;
    displayName: string;
    familyName: string;
    givenName: string;
    imageUrl: string;
    role: string;
    // Owner data
    owner: string;
    userId: string;
    idToken: string;
    serverAuthCode: string;
}
export interface EventInterface {
  title: string;
  description: string;
  location: string;
  coverPictureUrl: string;
  createdBy: string;
}
// export class Event

@Injectable()
export class DataService {

  debug: Boolean
  prefix: string

	constructor(
    private http: Http,
    private userDataService: UserDataService
    // private loadingCtrl: LoadingController
    ) { 
    this.debug = false;
    if (this.debug){
      this.prefix = 'http://85.250.82.28'//'http://win7-kros-PC'
    }else{
      // heroku prefix
      this.prefix = 'https://autophoto.herokuapp.com'
    }

    
  }
	
	saveUserToCloud(newUser: any): Observable<any> {
    console.log('execute saveUserToCloud()')
		return this.http.post(this.prefix+'/user/createUser', {newUser:newUser})
  }
  createEvent(newEvent: EventInterface): Observable<any> {
    console.log('execute createEvent()')
    //console.log('newEvent',newEvent)
    return this.http.post(this.prefix+'/event/createEvent', {newEvent:newEvent})
  }
  getEventById(id: string): Observable<any> {
    console.log('execute getEventById()')
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    // loading.present()
    return this.http.get(this.prefix+'/event/'+id)
  }
  insertUserIdToGroup(groupId, userId): Observable<any> {
    console.log('execute insertUserIdToGroup()')
    // return this.userDataService.getUser().then(
    //   val=>{
    //     console.log('EventCreatePage - constructor',val)
    //     if (val.firebaseId){
    return this.http.post(this.prefix+'/group/insertUserIdToGroup', {groupId: groupId, userId: userId})
      //   }
      // },err=>{
      //   return console.log('err',err)
      // })
  }
  getEventPhotosById(eventId): Observable<any> {
    console.log('execute getEventPhotosById()')
    return this.http.get(this.prefix+'/event/getEventPhotosById/'+eventId)
  }
  addFilesToEvent(eventId, userId, pictureUri): Observable<any> {
    console.log('execute addFilesToEvent')

    // Add the file uri to the request
    //
    return this.http.post(this.prefix+'/event/addFilesToEvent', {eventId: eventId, userId: userId})
  }
  getGalleryDataByEventGalleryId(eventGalleryId): Observable<any> {
    console.log('execute getGalleryDataByEventGalleryId()')
    return this.http.get(this.prefix+'/gallery/'+eventGalleryId)
  }
  getGroupUsers(eventGroupId): Observable<any> {
    console.log('execute getGroupUsers()')
    return this.http.get(this.prefix+'/group/'+eventGroupId)
  }
  insertFilesToGalleryId(paramsToSend): Observable<any> {
    console.log('execute insertFilesToGalleryId()')
    // let dataToSend = {
    //   galleryId: paramsToSend.galleryId,
    //   userId: paramsToSend.userId,
    //   file: ''
    // }

    // Headers
    let headers = new Headers();
    headers.set('Content-Type', 'multipart/form-data');
    console.log('headers',headers)
    
    // Form data    
    let formData = new FormData();
    formData.append('galleryId', paramsToSend.galleryId);
    formData.append('userId', paramsToSend.userId);
    formData.append('photo',  paramsToSend.fileUri);
    // window.resolveLocalFileSystemURL(paramsToSend.fileUri, function (file) {
    //   formData.append("documento", file);
    // });
    // console.log('formData',formData.get('photo'))

    return this.http.post(this.prefix+'/gallery/insertFilesToGalleryId', formData ,{'headers': headers});
  }
}