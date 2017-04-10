import { Component } from '@angular/core';

import { NavController, NavParams, Platform, LoadingController} from 'ionic-angular';
import { BarcodeScanner} from 'ionic-native';

import { EventInfoPage } from '../event-info/event-info.component';

import { DataService } from '../../providers/data.service';

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

  //full_name: string
  //profile_picture: string
  //google_raw_data: any
  //loggedIn: boolean
  //authManagerComp: AuthManagerComponent
  //userProfile: any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public dataService: DataService,
    public loadingCtrl: LoadingController
    //public af: AngularFire
    // public alertController : AlertController
    ) {
  }


  


  scan() {
    BarcodeScanner.scan().then((barcodeData) => {
      // alert(barcodeData.text);
      if (barcodeData.text){
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present()
        this.dataService.getEventById(barcodeData.text).map(item=>item.json())
        .subscribe(res=>{
          // Send event details by navParams
          if (res.success>0){
            this.navCtrl.push(EventInfoPage, {eventParams: res.data});
          }
          console.log('event results',res)
        },err=>{
          console.log('Not a valid id',err)
          alert('Not a valid id')
          loading.dismiss()
        },()=>{
          loading.dismiss()
        })
      }else{
        console.log('user cancel, or Cant find any QR')
      }
    }, (err) => {
      alert(err);
    });
  }

}
