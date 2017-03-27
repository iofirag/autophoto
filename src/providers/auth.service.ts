import { Injectable } from '@angular/core';
import { GooglePlus } from 'ionic-native';
// import { AngularFire } from 'angularfire2';
// import { AppSettings } from 'app.settings';

@Injectable()
export class AuthService {
  	
  	constructor(
      // public af: AngularFire
      ) { }

    googlePlusLogin(): Promise<any> {
      console.log('execute googlePlusLogin()')
      return GooglePlus.login({
        'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId' : '604150610506-8n7n4nr6ra82go1mlt9kdamfrel5k5ls.apps.googleusercontent.com',//AppSettings.GOOGLE_WEB_CLIENT_ID,
        'offline': true
      })
      .then((userData) => {
        //console.log("userData " + JSON.stringify(userData));
        console.log('userData',userData) 
        //this.af.auth.login(userData.idToken, {})
        
        return userData
      })
      .catch((gplusErr) => {
        //console.log("GooglePlus failure: " + JSON.stringify(gplusErr));
        console.error('Error while login', gplusErr)
        throw gplusErr
      });
      // return new Promise( ()=>{
      //   this.af.auth.login()
      //   console.log('login success')
      //   // debugger
      // } )
    }

  	logout(): Promise<any>{
  		return GooglePlus.logout().then( (logoutSuccessRes)=>{
  			return logoutSuccessRes;
	      // delete this.full_name;
	      // delete this.profile_picture;
	      // delete this.google_raw_data;
	      // this.local.set('isAuth', false);
	      // this.loggedIn = false;
	    }, (logoutErr)=>{
  			return logoutErr;
	    });
     // return new Promise( ()=>{
     //   this.af.auth.logout()
     //    console.log('logout success')
     //   debugger
     // }  );
  	}
}
