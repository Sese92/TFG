import { ApiClientService } from './../../client/index';
import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera'
import firebase from 'firebase'

@IonicPage()
@Component({
  selector: 'page-new-product',
  templateUrl: 'new-product.html',
})
export class NewProductPage {
  public myForm: FormGroup;
  public productName;
  public description;
  public price;

  public productID;
  public imagesArray;

  haveImages;


  public myPhotosRef;
  public myPhoto;
  public myPhotoURL;

  constructor(private camera: Camera, public navCtrl: NavController, public formBuilder: FormBuilder, public viewCtrl: ViewController,
    public api: ApiClientService) {
    this.myForm = this.createMyForm();
    this.haveImages = false;
    this.myPhotosRef = firebase.storage().ref('/Products/');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductPage');
    this.api.getAllProducts().subscribe((result) => {
      this.productID = result.body.length + 1;
    })
  }

  createMyForm() {
    return this.formBuilder.group({
      productName: ["", Validators.required],
      description: ["", Validators.required],
      price: ["", Validators.required]
    });
  }

  saveData() {
    this.productName = this.myForm.value.productName;
    this.description = this.myForm.value.description;
    this.price = this.myForm.value.price;
  }

  close(){
    this.viewCtrl.dismiss();
  }

  takePhoto() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  selectPhoto(): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  private uploadPhoto(): void {
    this.myPhotosRef.child(this.productID).child((this.imagesArray.length + 1) + ".png")
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL;
      });
  }

}
