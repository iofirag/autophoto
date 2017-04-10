// Core
import { Component, ViewChild } from '@angular/core';
// Ionic
import { NavController, Events, MenuController, Nav, Platform } from 'ionic-angular';
// import { Splashscreen } from 'ionic-native';
import { StatusBar, Splashscreen } from 'ionic-native';
// import { Storage } from '@ionic/storage';
//import { NativeStorage } from 'ionic-native';


// Pages
import { AccountPage } from '../pages/account/account.component';
import { EventScanPage } from '../pages/event-scan/event-scan.component';
import { LoginPage } from '../pages/login/login.component';
import { TutorialPage } from '../pages/tutorial/tutorial.component';
import { EventPage } from '../pages/event/event.component';
import { EventCreatePage } from '../pages/event-create/event-create.component';
// import { AboutPage } from '../pages/about/about';
// import { MapPage } from '../pages/map/map';
// import { SignupPage } from '../pages/signup/signup';
// import { TabsPage } from '../pages/tabs/tabs';
// import { SchedulePage } from '../pages/schedule/schedule';
// import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
// import { SupportPage } from '../pages/support/support';
// Services

// import { AppSettings } from '../providers/app.settings';
import { AuthService } from '../providers/auth.service';
import { DataService } from '../providers/data.service';
import { UserDataService } from '../providers/user-data.service';
// import { ConferenceData } from '../providers/conference-data';

// import { AngularFire } from 'angularfire2';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class MyApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  //@ViewChild(Nav) nav: Nav;
  @ViewChild(Nav) nav: NavController;
  //@ViewChild('myNav') nav: NavController

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    // { title: 'Schedule', component: TabsPage, tabComponent: SchedulePage, icon: 'calendar' },
    // { title: 'Speakers', component: TabsPage, tabComponent: SpeakerListPage, index: 1, icon: 'contacts' },
    // { title: 'Map', component: TabsPage, tabComponent: MapPage, index: 2, icon: 'map' },
    // { title: 'About', component: TabsPage, tabComponent: AboutPage, index: 3, icon: 'information-circle' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Create Event', component: EventCreatePage, icon: 'create' },
    { title: 'Group to event', component: EventScanPage, icon: 'search' },
    { title: 'Account', component: AccountPage, icon: 'person' },
    { title: 'Event', component: EventPage, icon: 'film' },
    { title: 'Logout', component: LoginPage, icon: 'log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    // { title: 'Login', component: LoginPage, icon: 'log-in' }
  ];
  rootPage: any;

  constructor(
    public events: Events,
    public userDataService: UserDataService,
    public menu: MenuController,
    public platform: Platform,
    public authService: AuthService
    // public af: AngularFire
    // public confData: ConferenceData,
  ) {
    this.platform.ready().then(() => {
      // this.rootPage = HomePage;
      // this.platform.ready().then(() => {
      //   Splashscreen.hide();
      // });

      // App entry
      // Check if the user has already seen the tutorial
      // this.storage.get('hasSeenTutorial')
      //   .then((hasSeenTutorial) => {
      //     if (hasSeenTutorial) {
      //       this.rootPage = SupportPage;
      //     } else {
      //       this.rootPage = TutorialPage;
      //     }
      //     this.platformReady()
      //   })
      console.log('restarting..')
      this.tutorialRouting()

      // load the conference data
      //confData.load();

      // decide which menu items should be hidden by current login status stored in local storage
      // this.userData.hasLoggedIn().then((hasLoggedIn) => {
        //this.enableMenuTypeByLoginStatus(hasLoggedIn === true);
      // });

      this.listenToLoginEvents();
      // this.menu.enable(true, 'loggedOutMenu');
      // console.log('loggedoutmenu')

      // if (StatusBar) {
      //   //if (ionic.Platform.isAndroid()) {
      //     StatusBar.backgroundColorByHexString('#1976D2');
      //   //} else {
      //     //StatusBar.styleLightContent();
      //   //}
      // }
      // this.events.subscribe(this.userDataService.ACTIVE_EVENT, () => {
      //   //this.enableMenuTypeByLoginStatus(true);
      //   //console.log('subscribe',this.userDataService.ACTIVE_EVENT)
      //   //this.checkForActiveEvent()
      //   this.rootPage = EventPage;
      // });
    });
  }

  tutorialRouting() {
    //console.log('tutorialRouting() start')
    this.userDataService.checkHasSeenTutorial().then( (hasSeenTutorial) => {
      //console.log('hasSeentutorial='+hasSeenTutorial)
      if (hasSeenTutorial) {
        this.loggingRouting();
      } else {
        this.rootPage = TutorialPage;
      }
      this.platformReady()
    })
  }
  loggingRouting() {
    this.userDataService.hasLoggedIn().then( (isLoggedIn) => {
        //console.log('isLoggedIn='+isLoggedIn)
        this.loginHandler(isLoggedIn);
        this.platformReady()
      })
  }

  listenToLoginEvents() {
    // this.af.auth.subscribe(auth =>{
    //   console.log('auth result=', auth)
    //   debugger
    //   if (auth) {
    //     console.log(auth.auth.providerData[0])
    //     alert("firebase logged in")
    //   } else {
    //     alert("firebase not logged in")
    //   }
    // })

    this.events.subscribe(this.userDataService.HAS_SEEN_TUTORIAL, () => {
      //console.log('subscribe hasSeenTutorial')
      // this.enableMenuTypeByLoginStatus(false);

      this.loggingRouting()
      // this.userData.hasLoggedIn().then( (isLoggedIn) => {
      //   if (isLoggedIn) {
      //     this.enableMenuTypeByLoginStatus(true);
      //     this.rootPage = SupportPage;
      //   } else {
      //     this.enableMenuTypeByLoginStatus(false);
      //     this.rootPage = LoginPage;
      //   }
      //   this.platformReady()
      // })


      // this.nav.setRoot(LoginPage).catch(() => {
      //   console.log("Didn't set nav root");
      // });
    });

    this.events.subscribe(this.userDataService.USER_LOGIN, () => {
      this.loginHandler(true)
    });

    this.events.subscribe(this.userDataService.USER_SIGNUP, () => {
      this.loginHandler(true)
    });

    this.events.subscribe(this.userDataService.USER_LOGOUT, () => {
      console.log('logout subscribe')
      this.loginHandler(false)
    });
    console.log('listen to login events')
  }

  loginHandler(isLoggedIn: Boolean) {
    if (isLoggedIn) {
      this.enableMenuTypeByLoginStatus(true);
      this.events.subscribe(this.userDataService.ACTIVE_EVENT, () => {
        this.redirectToActiveEvent()
      });
      this.checkForActiveEvent()
      console.log('loginHandler')
    } else {
      this.enableMenuTypeByLoginStatus(false);
      this.rootPage = LoginPage;
      console.log('loginHandler LoginPage')
    }
  }
  checkForActiveEvent() {
    this.userDataService.isActiveEvent().then( (isActiveEvent) => {
      console.log('isActiveEvent',isActiveEvent)
      if (isActiveEvent){
        this.redirectToActiveEvent()
      }else{
        this.rootPage = EventScanPage;
      }
    }) 
  }
  redirectToActiveEvent() {
    //let test = this.nav.getViews() 
    this.rootPage = EventPage;
    if (this.nav.getViews().length >0){  // TODO
      this.nav.popToRoot().then(()=>{
        console.log('pop all')
      },err=>{
        console.log('popToRoot fail, maybe there is not views in the stack')
      });
    }
    
  }
  enableMenuTypeByLoginStatus(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');  
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      Splashscreen.hide();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return 'primary';
    }
    return;
  }
  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      // Tabbed pages
      this.nav.setRoot(page.component, { tabIndex: page.index });
    } else {
      let pushToStackPages = [EventCreatePage, AccountPage, EventScanPage]
      if (pushToStackPages.indexOf(page.component)>-1){
        // Push to stack
        this.nav.push(page.component);
      }else{
        // Set root
        this.nav.setRoot(page.component).catch(ex => {
          console.log("Didn't set nav root");
        });
      }
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.authService.logout().then((success)=>{
          this.userDataService.logout();
        })
        
      }, 1000);
    }
  }

  openTutorial() {
    //this.nav.setRoot(TutorialPage);
    this.rootPage = TutorialPage;
  }
}
