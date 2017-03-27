// Core
import { NgModule, ErrorHandler } from '@angular/core';
// Ionic
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
// import { Storage } from '@ionic/storage';
import { NativeStorage } from 'ionic-native';
//import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
// Pages
import { AccountPage } from '../pages/account/account.component';
import { EventScanPage } from '../pages/event-scan/event-scan.component';
import { LoginPage } from '../pages/login/login.component';
import { TutorialPage } from '../pages/tutorial/tutorial.component';
import { EventPage } from '../pages/event/event.component';
import { EventCreatePage } from '../pages/event-create/event-create.component';
import { EventFoundedPage } from '../pages/event-founded/event-founded.component';
//import { AuthManagerComponent } from '../pages/auth-manager/auth-manager.service';

// Services
//import { AppSettings } from '../providers/app.settings';
import { AuthService } from '../providers/auth.service';
import { DataService } from '../providers/data.service';
import { UserDataService } from '../providers/user-data.service';
// Modules
// import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
// Import the AF2 Module
// import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// import firebase from 'firebase';
// import { AngularFireModule, AngularFire } from 'angularfire2';


// const cloudSettings: CloudSettings = {
//   'core': {
//     'app_id': '81a73e49'
//   }
//   ,
//   // 'auth': {
//   //   'google': {
//   //     'webClientId': '659735767423-fbbdedbovk01kagcrskn1p3emlm8n6oo.apps.googleusercontent.com',
//   //     'scope': []
//   //   }
//   // }
//   // ,
//   'push': {
//     'sender_id': '717733613640',
//     'pluginConfig': {
//       'ios': {
//         'badge': true,
//         'sound': true
//       },
//       'android': {
//         'iconColor': '#343434'
//       }
//     }
//   }
// }

// Initialize Firebase
// export const firebaseConfig = {
//   apiKey: "AIzaSyC5BebIOada0g0YKpQQRGIqikX_VDDCyEg",
//   authDomain: "autophoto-3e7d2.firebaseapp.com",
//   databaseURL: "https://autophoto-3e7d2.firebaseio.com",
//   storageBucket: "autophoto-3e7d2.appspot.com",
//   messagingSenderId: "604150610506"
// };
// const myFirebaseAuthConfig = {
//   provider: AuthProviders.Google,
//   method: AuthMethods.Popup
//   //,
//   //method: AuthMethods.OAuthToken //AuthMethods.Popup,
// };

@NgModule({
  declarations: [
    MyApp,
    AccountPage,
    EventScanPage,
    LoginPage,
    TutorialPage,
    EventPage,
    EventCreatePage,
    EventFoundedPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    // AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
    //CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountPage,
    EventScanPage,
    LoginPage,
    TutorialPage,
    EventPage,
    EventCreatePage,
    EventFoundedPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserDataService,
    DataService,
    AuthService,
    //AppSettings,
    NativeStorage
  ]
})
export class AppModule {}
