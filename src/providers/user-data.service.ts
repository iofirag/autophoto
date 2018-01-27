import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';

// Native Storage errors:
export enum NativeStorageErrCodes{
  NATIVE_WRITE_FAILED = 1,
  ITEM_NOT_FOUND = 2,
  NULL_REFERENCE = 3,
  UNDEFINED_TYPE = 4,
  JSON_ERROR = 5,
  WRONG_PARAMETER = 6
}

export interface UserInterface {
  email: string;
  userId: string;
  displayName: string;
  familyName: string;
  givenName: string;
  imageUrl: string;
  idToken: string;
  serverAuthCode: string;
  fbaseId: string;
}


@Injectable()
export class UserDataService {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  USER = 'user';
  ACTIVE_EVENT = 'activeEvent'

  USER_LOGIN = 'user:login'
  USER_SIGNUP = 'user:signup'
  USER_LOGOUT = 'user:logout'

  constructor(
    public events: Events
  ) {}

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  saveLoginDetails(profile: UserInterface): void {
    this.storeUser(profile).then(()=>{
      this.events.publish(this.USER_LOGIN);
    }, (err)=>{
      console.error('Error storing user',err)
    })
  };

  signup(email: string): void {
    // NativeStorage.setItem(this.HAS_LOGGED_IN, true).then(
    //   ()=>{
    //     newUser: this.UserInterface;
    //     newUser.email = email
    //     this.storeUser(newUser).then(()=>{
    //       this.events.publish(this.USER_SIGNUP);
    //     }, (err)=>{
    //       console.error('Error storing user',err)
    //     })
    //   },(err)=> {
    //     console.error('Error storing Has logged in', err)
    //   });
  };

  logout(): void {
    NativeStorage.remove(this.USER).then(()=>{
      this.events.publish(this.USER_LOGOUT);
    }, (err)=>{
      console.error('Error logout',err)
    })
    NativeStorage.remove(this.ACTIVE_EVENT).then(()=>{
      this.events.publish(this.USER_LOGOUT);
    }, (err)=>{
      console.error('Error logout',err)
    })
  };

  storeUser(profile: UserInterface): Promise<any> {
    return NativeStorage.setItem(this.USER, { profile:profile, loggedIn:true })
  }

  getUser(): Promise<any> {
    return NativeStorage.getItem(this.USER).then((value) => {
      if (typeof value!='object'){
        throw 'exception in getUser';
      }else{
        return value.profile;
      }
    }, (err)=>{
      console.error('Error get user', err)
    });
  }

  // getUsername(): Promise<string> {
  //   return this.storage.get('username').then((value) => {
  //     return value;
  //   });
  // };

  hasLoggedIn(): Promise<boolean> {
    return NativeStorage.getItem(this.USER).then((value) => {
      return value.loggedIn;
    }, (err)=>{
        if(err.code==NativeStorageErrCodes.ITEM_NOT_FOUND){ 
          return false;
        }else{
          console.error('Error check has seen tutorial', err)
          throw err
        }
      });
  };
  setActiveEvent(EventData): void {
    NativeStorage.setItem(this.ACTIVE_EVENT, EventData).then(
      ()=>{
        this.events.publish(this.ACTIVE_EVENT);
      }, (err)=>{
        console.error('Error set active event', err)
      });
  }
  getActiveEvent(): Promise<string> {
    return NativeStorage.getItem(this.ACTIVE_EVENT).then(value=>{
      return value
    }, (err)=>{
      if(err.code==NativeStorageErrCodes.ITEM_NOT_FOUND){ 
        return false;
      }else{
        console.error('Error check has seen tutorial', err)
        throw err
      }
    })
  }
  setActiveEventId(firebaseEventId): void {
    NativeStorage.setItem(this.ACTIVE_EVENT, firebaseEventId).then(
      ()=>{
        this.events.publish(this.ACTIVE_EVENT);
      }, (err)=>{
        console.error('Error set active event id', err)
      });
  }
  getActiveEventId(): Promise<string> {
    return NativeStorage.getItem(this.ACTIVE_EVENT).then(value=>{
      return value
    }, (err)=>{
      if(err.code==NativeStorageErrCodes.ITEM_NOT_FOUND){ 
        return false;
      }else{
        console.error('Error check has seen tutorial', err)
        throw err
      }
    })
  }
  isActiveEvent(): Promise<boolean> {
    return NativeStorage.getItem(this.ACTIVE_EVENT).then(value=>{
      return !!value
    }, (err)=>{
      if(err.code==NativeStorageErrCodes.ITEM_NOT_FOUND){ 
        return false;
      }else{
        console.error('Error check has seen tutorial', err)
        throw err
      }
    })
  }
  setHasSeenTutorial(hasSeenTutorial: Boolean): void {
    NativeStorage.setItem(this.HAS_SEEN_TUTORIAL, hasSeenTutorial).then(
      ()=>{
        this.events.publish(this.HAS_SEEN_TUTORIAL);
      }, (err)=>{
        console.error('Error set has seen tutorial', err)
      });
  };
  checkHasSeenTutorial(): Promise<Boolean> {
    return NativeStorage.getItem(this.HAS_SEEN_TUTORIAL).then((value) => {
      //console.log('checkHasSeenTutorial start')
      return value;
    }, (err)=>{
        if(err.code==NativeStorageErrCodes.ITEM_NOT_FOUND){ 
          return false;
        }else{
          console.error('Error check has seen tutorial', err)
          throw err
        }
      });
  };
}



