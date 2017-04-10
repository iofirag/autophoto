import { Component } from '@angular/core';
import { NavController, NavParams ,Events, MenuController, LoadingController } from 'ionic-angular';
// Pages
import { HomePage } from '../home/home.component';
// Provider
import { AuthService } from '../../providers/auth.service';
import { DataService } from '../../providers/data.service';
import { UserDataService } from '../../providers/user-data.service';
//import { AppSettings } from '../../providers/app.settings';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html'
})
export class LoginPage {
  //login: {username?: string, password?: string} = {};
  //submitted = false;
  //userProfile: any = null;

  constructor(
  	public navCtrl: NavController, 
  	public authService: AuthService,
    public dataService: DataService,
  	public userDataService: UserDataService,
    public events: Events,
    public menu: MenuController,
    public loadingCtrl: LoadingController
  	) { 
      // console.log('publish user:login')   // For test  
      // this.events.publish('user:login');  // For test  

      // alert(AppSettings.TEST)
      // this.menu.enable(true, 'loggedOutMenu');
  }

  // googleSignInOld() {
  //   this.authService.loginOld().then((userRes)=>{
  //     // save to local storage
  //     try{
  //       console.log('google sign in success')
  //       this.userProfile = userRes;
  //       this.userDataService.login(userRes)
  //     }catch(ex){
  //         this.loginError('Error while login')
  //     }
      

  //   }, (errRes)=>{
  //     alert(JSON.stringify(errRes))
  //   })
  // }

  googleSignIn() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
  	this.authService.googlePlusLogin().then((userRes)=>{
      let ownerData = {
        owner: 'google',
        userId: userRes.userId,
        idToken: userRes.idToken,
        serverAuthCode: userRes.serverAuthCode
      }
      let newUser = {
        email: userRes.email,
        displayName: userRes.displayName,
        familyName: userRes.familyName,
        givenName: userRes.givenName,
        imageUrl: userRes.imageUrl,
        ownerData: ownerData
      }
      this.dataService.saveUserToCloud(newUser)
      .map(mapRes=>mapRes.json())
      .subscribe(
        (res)=>{
          console.log('cloud result:',res)
          if ( (res.success==1 || res.success==2) && res.data){
            // save to local storage
            this.userDataService.saveLoginDetails(res.data)
          }
        },err=>{
          console.log('err',err)
          loading.dismiss();
          throw err;
        },()=>{
          loading.dismiss();
        })
  	}, (errRes)=>{
      if (errRes==12501){
        // Maybe user cencel the popup or wrong web_client_id parameter
        console.log('Error: login error',errRes)
      }else{
        this.loginError('Error while login')
      }
      loading.dismiss();
  	})
  }

  
  loginError(ex) {
    alert(ex)
  }
  // ionViewDidEnter() {
  //   // the root left menu should be disabled on the tutorial page
  //   this.menu.enable(true);
  // }

  // onLogin(form: NgForm) {
  //   //this.submitted = true;
  //   let gUserName = ''

  //   if (form.valid) {
  //     this.userData.login(gUserName);
  //     this.navCtrl.push(HomePage);
  //   }
  // }

  // onSignup() {
  //   this.navCtrl.push(SignupPage);
  // }

  // doGoogleLogin(){
  //   let nav = this.navCtrl;
  //   let loading = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });
  //   loading.present();
  //   GooglePlus.login({
  //     'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
  //     'webClientId': 'webClientId.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
  //     'offline': true
  //   })
  //   .then(function (user) {
  //     loading.dismiss();

  //     NativeStorage.setItem('user', {
  //       name: user.displayName,
  //       email: user.email,
  //       picture: user.imageUrl
  //     })
  //     .then(function(){
  //       nav.push(UserPage);
  //     }, function (error) {
  //       console.log(error);
  //     })
  //   }, function (error) {
  //     loading.dismiss();
  //   });
  // }
  // doGoogleLogout(){
  //   let nav = this.navCtrl;
  //   GooglePlus.logout()
  //   .then(function (response) {
  //     NativeStorage.remove('user');
  //     nav.push(LoginPage);
  //   },function (error) {
  //     console.log(error);
  //   })
  // }
}
