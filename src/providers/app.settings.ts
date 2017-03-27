import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AppSettings provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppSettings {

	public static API_ENDPOINT='http://127.0.0.1:6666/api/';
	public static GOOGLE_WEB_CLIENT_ID = '659735767423-fbbdedbovk01kagcrskn1p3emlm8n6oo.apps.googleusercontent.com';
   	public static TEST = 'test';

  constructor() {
    //console.log('Hello AppSettings Provider');
  }

}
