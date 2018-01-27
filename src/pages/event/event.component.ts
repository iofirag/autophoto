import { Component/*, Pipe*/ } from '@angular/core';
import { NavController, NavParams, FabContainer/*, ActionSheetController*/ } from 'ionic-angular';

// import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
// import { File } from '@ionic-native/file';
// import { Camera, CameraOptions, Transfer } from 'ionic-native';

import { Camera, CameraOptions/*, FilePath*/ } from 'ionic-native';
import { Transfer/*, TransferObject, FileUploadOptions*/ } from '@ionic-native/transfer';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ImagePicker } from '@ionic-native/image-picker';

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
	galleryPhotos: any;
	//fileTransfer: any

	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		public dataService: DataService,
		public userDataService: UserDataService,
	  	private transfer: Transfer,
		private photoViewer: PhotoViewer,
		private imagePicker: ImagePicker  
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
			// console.log('imageUri',imageUri)

			// this.galleryPhotos['test'] = {secure_url: imageUri}
			// this.photosKeys.push('test')

			// let uploadFilePath = 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png'
			// let endpoint = 'https://autophoto.herokuapp.com/gallery/insertFilesToGalleryId'
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

			// let options: FileUploadOptions = {
			//     fileKey: 'photo',
			//     chunkedMode: false,
			//     // headers: {},
			//     params : {
			//     	galleryId: this.eventData.galleryId,
			//     	userId: this.userProfile.firebaseId
			//     }
			// }
			// const fileTransfer: TransferObject = this.transfer.create();
			// console.log('start transfering')
			// fileTransfer.upload(imageUri, endpoint, options)
			let paramsToSend = {
				galleryId: this.eventData.galleryId,
				userId: this.userProfile.firebaseId,
				filePath: imageUri
			}
			// console.log('paramsToSend 1',paramsToSend)
			this.dataService.insertFilesToGalleryId(paramsToSend)
				.then((fileTransferRes) => {
					// console.log('fileTransferRes',fileTransferRes.response)
					// console.log(JSON.parse(fileTransferRes.response))

					var resData = JSON.parse(fileTransferRes.response)
					// console.log('resData',resData)
					// success
					if (resData && resData.success>0){
						// console.log('resData.success',resData.success)
						// let pictureCloudData = resData.data
						this.galleryPhotos[resData.data.uniqueKey] = resData.data
						let oldKeys = this.photosKeys;
						oldKeys.unshift(resData.data.uniqueKey)
						this.photosKeys = oldKeys
						
						// console.log('resData.data.uniqueKey',resData.data.uniqueKey)
						// console.log('this.galleryPhotos[resData.data.uniqueKey]',this.galleryPhotos[resData.data.uniqueKey])
						// console.log('this.photosKeys',this.photosKeys)
					}else{
						console.log('Upload error',fileTransferRes)
					}
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

	getPhotoFromGallery(fab: FabContainer): void {
		if(fab != undefined){
			fab.close();
		}
		
		this.imagePicker.getPictures({
			maximumImagesCount: 20
		}).then((imagesURI)=>{
			console.log(imagesURI);

			for(let i = 0; i < imagesURI.length; i++){
				let paramsToSend = {
					galleryId: this.eventData.galleryId,
					userId: this.userProfile.firebaseId,
					filePath: imagesURI[i]
				}

				this.dataService.insertFilesToGalleryId(paramsToSend).then((fileTransferRes) => {
					// console.log('fileTransferRes',fileTransferRes.response)
					// console.log(JSON.parse(fileTransferRes.response))

					var resData = JSON.parse(fileTransferRes.response)
					// console.log('resData',resData)
					// success
					if (resData && resData.success>0){
						// console.log('resData.success',resData.success)
						// let pictureCloudData = resData.data
						this.galleryPhotos[resData.data.uniqueKey] = resData.data
						let oldKeys = this.photosKeys;
						oldKeys.unshift(resData.data.uniqueKey)
						this.photosKeys = oldKeys
						
						// console.log('resData.data.uniqueKey',resData.data.uniqueKey)
						// console.log('this.galleryPhotos[resData.data.uniqueKey]',this.galleryPhotos[resData.data.uniqueKey])
						// console.log('this.photosKeys',this.photosKeys)
					}else{
						console.log('Upload error',fileTransferRes)
					}
				}, (err) => {
					// error
					console.log('err',err)			     
				});
			}
		},
		(ex)=>{
			console.error(ex);
		})
	}

 	getGalleryDataByEventGalleryId(): void {
  		this.fetchPhotos().then((val)=>{
  			//refresher.complete();
  			console.log('fetchPhotos() success',val)
  		},err=>{
  			//refresher.cancel()
  			console.log('fetchPhotos() err',err)

  		})
	}

	ionViewDidLoad(): void {
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
		  			console.log('galleryDataRes',galleryDataRes);
	  				if (galleryDataRes.success>0){
		  				if (galleryDataRes.data){
		  					//debugger;
		  					//this.eventData = galleryDataRes.data

							// Adding the tinyPicture url
							for(let id in galleryDataRes.data){
								console.log(galleryDataRes.data[id]);
								galleryDataRes.data[id]['tinyPicURL'] = this.getTinyPicture(galleryDataRes.data[id].secure_url);
							}							
							
							this.galleryPhotos = galleryDataRes.data || {};
							console.log('this.galleryPhotos', this.galleryPhotos);

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

	getTinyPicture(picUrl: string): string {
		return picUrl.split("upload")[0] + "upload/w_100,h_100" + picUrl.split("upload")[1];
	}

	showPic(pic: any): void {
		console.log(this.galleryPhotos[pic].uploadBy);

		this.dataService.getUserName(this.galleryPhotos[pic].uploadBy).subscribe((resFromServer) => {
			console.log(resFromServer);

			if(resFromServer.success > 0){
				let name = resFromServer.name;
				console.log(this.galleryPhotos[pic].secure_url);
				
				this.photoViewer.show(this.galleryPhotos[pic].secure_url, "Uploaded By: " + name, {
					share: true
				})
			}else{
				console.error(resFromServer.description);
			}
		},
		(ex)=>{
			console.error(ex);
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