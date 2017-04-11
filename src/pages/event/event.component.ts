import { Component, Pipe } from '@angular/core';
import { NavController, NavParams, FabContainer/*, ActionSheetController*/ } from 'ionic-angular';

// import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
// import { File } from '@ionic-native/file';
// import { Camera, CameraOptions, Transfer } from 'ionic-native';

import { Camera, CameraOptions, FilePath } from 'ionic-native';
import { Transfer, TransferObject, FileUploadOptions } from '@ionic-native/transfer'

import { DataService } from '../../providers/data.service';
import { UserDataService } from '../../providers/user-data.service';
/*
  Generated class for the Event page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event',
  templateUrl: 'event.component.html'
})
export class EventPage {
	
	userProfile: any;		//userProfile.firebaseId
	//eventId: string;
	eventData: any;
	photosKeys: Array<string>;
	galleryPhotos: Array<any>;
	//fileTransfer: any

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public dataService: DataService,
  	public userDataService: UserDataService,
  	private transfer: Transfer
  	// public actionSheetCtrl: ActionSheetController,
  	) { }

	

	ngOnInit() {
		this.restoreUserProfile()
  		this.restoreCurrentEvent()
	}

  	restoreUserProfile() {
  		this.userDataService.getUser().then(
  			val=>{
  				this.userProfile = val
  			},err=>{
  				console.log(' restoreUserProfile() err',err)
  			})
	}
  	restoreCurrentEvent() {
		this.userDataService.getActiveEvent().then(
		(eventData)=>{
  			this.eventData = eventData;
  			this.getGalleryDataByEventGalleryId()
  		},err=>{
  			console.log('restoreCurrentEventId()',err)
  		})
	}

	addPhoto(socialNet: string, fab: FabContainer): void {
		if (fab !== undefined) {
	      fab.close();
	    }
		
		let sourceType;		//Default is CAMERA. PHOTOLIBRARY : 0, CAMERA : 1, SAVEDPHOTOALBUM : 2
		switch(socialNet){
			case 'camera':
				sourceType = Camera.PictureSourceType.CAMERA
				break;
			case 'images':
				sourceType = Camera.PictureSourceType.PHOTOLIBRARY
				break;
		}
	  	

	  	const options: CameraOptions = {
		  	quality: 100,
		  	destinationType: Camera.DestinationType.FILE_URI, //.DATA_URL (data),	//.NATIVE_URI (ios) //.FILE_URI (android)
		  	encodingType: Camera.EncodingType.JPEG,
		  	mediaType: Camera.MediaType.PICTURE,
		  	//allowEdit : true,
		  	sourceType: sourceType,
		  	saveToPhotoAlbum: true,
	    	correctOrientation: true
		}

	  	Camera.getPicture(options).then((imageUri) => {
		 // imageData is either a base64 encoded string or a file URI
		 // If it's base64:

		 // var options = {
		 //    fileKey: "file",
		 //    fileName: filename,
		 //    chunkedMode: false,
		 //    mimeType: "multipart/form-data",
		 //    params : {'fileName': filename}
		 //  };
			console.log('imageUri',imageUri)

			// this.galleryPhotos['test'] = {secure_url: imageUri}
			// this.photosKeys.push('test')

			// let uploadFilePath = 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png'
			let endpoint = 'https://autophoto.herokuapp.com/gallery/insertFilesToGalleryId'
			// var options = {
			//     fileKey: 'photo',
			//     //fileName: filename,
			//     chunkedMode: false,
			//     mimeType: 'multipart/form-data',
			//     params : {
			//     	galleryId: this.eventData.galleryId,
			//     	userId: this.eventData.userId 
			//     }
			// };

			let options: FileUploadOptions = {
			    fileKey: 'photo',
			    chunkedMode: false,
			    // headers: {},
			    params : {
			    	galleryId: this.eventData.galleryId,
			    	userId: this.userProfile.firebaseId
			    }
			}
			const fileTransfer: TransferObject = this.transfer.create();
			console.log('start transfering')
			fileTransfer.upload(imageUri, endpoint, options)
				.then((fileTransferRes) => {
				 // success
				 console.log('fileTransferRes',fileTransferRes)
				}, (err) => {
				 // error
				 console.log('err',err)			     
				})

 			// let dataParams = {
 			// 	galleryId: this.eventData.galleryId,
 			// 	userId: this.eventData.userId,
 			// 	fileUri: imageUri
 			// }
 			// var formData = new FormData();
		  //   formData.append('galleryId', this.eventData.galleryId);
		  //   formData.append('userId', this.eventData.userId);
		  //   formData.append('photo',  imageUri);

		  //   this.http.post(this.url +,
    //   		formData ,
	   //      {
	   //          headers: this.headers

	   //      });
 			// this.dataService.insertFilesToGalleryId(dataParams).map(mapRes=>mapRes.json())
	  	// 	.subscribe(// get body data
	  	// 		(uploadFileRes:any)=>{
		  // 			console.log('uploadFileRes',uploadFileRes)
				// },err=>{
				// 	console.log('insertFilesToGalleryId() err',err)
				// })
 		// 	this.fileTransfer = this.transfer.create();
 		// 	let uploadFilePath = 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png'
			// let endpoint = 'http://85.250.82.28/gallery/insertFilesToGalleryId'
 		// 	this.fileTransfer.upload(uploadFilePath, endpoint, options)
			//    .then((transferRes) => {
			//      // success
			//      console.log('Image succesful uploaded.',transferRes);
			//    }, (err) => {
			//      // error
			//      console.log('Error while uploading file.',err);
			//    })

  			//const fileTransfer = new Transfer();
			// Use the FileTransfer to upload the image
			//let uploadFilePath = 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png'
			//let endpoint = 'http://85.250.82.28/gallery/insertFilesToGalleryId'
			// fileTransfer.upload(uploadFilePath, endpoint, options).then(transferRes => {
			//     //this.loading.dismissAll()
			//     console.log('Image succesful uploaded.',transferRes);
			// }, err => {
			//     //this.loading.dismissAll()
			//     console.log('Error while uploading file.',err);
			// });
		 //let base64Image = 'data:image/jpeg;base64,' + imageData;
		}, (err) => {
		 // Handle error
		 console.log('camera error',err)
		});
	}

 	getGalleryDataByEventGalleryId() {
  		this.fetchPhotos().then((val)=>{
  			//refresher.complete();
  			console.log('fetchPhotos() success',val)
  		},err=>{
  			//refresher.cancel()
  			console.log('fetchPhotos() err',err)

  		})
	}

	ionViewDidLoad() {
	    console.log('ionViewDidLoad EventPage');
	}
	doRefresh(refresher) {
  		this.fetchPhotos().then((val)=>{
  			refresher.complete();
  		},err=>{
  			refresher.cancel()
  		})
	}

	fetchPhotos(): Promise<any> {
		return new Promise((resolve,reject)=>{
  			this.dataService.getGalleryDataByEventGalleryId(this.eventData.galleryId).map(mapRes=>mapRes.json())
	  		.subscribe(// get body data
	  			(galleryDataRes:any)=>{
		  			console.log('galleryDataRes',galleryDataRes)
	  				if (galleryDataRes.success>0){
		  				if (galleryDataRes.data){
		  					//debugger;
		  					//this.eventData = galleryDataRes.data
		  					this.galleryPhotos = galleryDataRes.data || {};
		  					this.photosKeys = Object.keys(galleryDataRes.data).slice().reverse();	//reverse
		  					// if ( !this.eventData.photos){
		  					// 	this.eventData.photos = {}
		  					// }
			  				//this.eventData.photos = this.eventData.photos || {}
			  				// if (this.eventData.photos){
			  				// 	this.photos = 
			  				// }else{
			  				// // 	this.eventData.photos = []
			  				// // }
		  				}else{
		  					alert('No data to show')
		  				}
		  				resolve()
	  				}else{
	  					alert('Error: get gallery data fail')
	  					reject()
	  				}
				},err=>{
					console.log('getGalleryDataByEventGalleryId() err',err)
					reject()
				})
  		})
	}

	// public presentActionSheet() {
	//     let actionSheet = this.actionSheetCtrl.create({
	//       title: 'Select Image Source',
	//       buttons: [
	//         {
	//           text: 'Load from Library',
	//           handler: () => {
	//             //this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
	//             alert('Get from library')
	//           }
	//         },
	//         {
	//           text: 'Use Camera',
	//           handler: () => {
	//             //this.takePicture(Camera.PictureSourceType.CAMERA);
	//             alert('Capture photo')
	//           }
	//         },
	//         {
	//           text: 'Cancel',
	//           role: 'cancel'
	//         }
	//       ]
	//     });
	//     actionSheet.present();
	//   }

	// getPhotosKeys(): Array<string>{
	// 	return Object.keys(this.eventData.photos);
	// }
}

// @Pipe({
//   name: 'reverse'
// })
// export class ReversePipe {
//   transform(value) {
//     return value.slice().reverse();
//   }
// }