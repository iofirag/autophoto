import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

export interface UserInterface {
  email: string;
  userId: string;
  displayName: string;
  familyName: string;
  givenName: string;
  imageUrl: string;
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

@Injectable()
export class DataService {

  debug: Boolean
  prefix: string

	constructor(
    private http: Http
    ) { 
    this.debug = true;
    if (this.debug){
      this.prefix = 'http://10.0.0.24:8080'
    }else{
      // heroku prefix
    }
  }
	
	saveUserToCloud(userProfile: UserInterface): Observable<any> {
		return this.http.post(this.prefix+'/user/createUser', userProfile)
  }
  createEvent(newEvent: EventInterface): Observable<any> {
    console.log('execute createEvent()')
    console.log('newEvent',newEvent)
    return this.http.post(this.prefix+'/event/createEvent', newEvent)
  }
}