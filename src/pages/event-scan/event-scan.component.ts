import { Component } from '@angular/core';

import { NavController, Platform} from 'ionic-angular';
import { BarcodeScanner} from 'ionic-native';

// import { AngularFire, FirebaseAuthState  } from 'angularfire2';
//import { GooglePlus } from 'ionic-native';
//import { AppSettings } from '../../providers/app-settings';
// import firebase from 'firebase'

// import { GooglePlus } from '@ionic/cloud-angular';

@Component({
  selector: 'page-event-scan',
  templateUrl: 'event-scan.component.html'
})
export class EventScanPage {

  full_name: string
  profile_picture: string
  google_raw_data: any
  //loggedIn: boolean
  //authManagerComp: AuthManagerComponent
  userProfile: any = null;

  constructor(
    public navCtrl: NavController,
    public platform: Platform
    //public af: AngularFire
    // public alertController : AlertController
    ) {
  }


  


  scan() {
    BarcodeScanner.scan().then((barcodeData) => {
      alert(barcodeData.text);
    }, (err) => {
      alert(err);
    });
  }

}
