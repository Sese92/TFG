import { ApiClientService } from './../../client/index';
import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera'
import firebase from 'firebase'
import { Storage } from '@ionic/storage';

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

  public user;
  public productID;
  public imagesArray;
  public contador = 0;

  public myPhotosRef;
  public myPhoto;
  public myPhotoURL;

  constructor(private camera: Camera, public storage: Storage, public navCtrl: NavController, public alertCtrl: AlertController, public formBuilder: FormBuilder, public viewCtrl: ViewController,
    public api: ApiClientService) {
    this.myForm = this.createMyForm();
    this.myPhotosRef = firebase.storage().ref('/Products/');
  }

  ionViewDidLoad() {
    this.contador = 0;
    this.imagesArray = new Array();
    console.log('ionViewDidLoad NewProductPage');
    this.storage.get('blockchainUser').then((user) => {
      this.user = user[0]
      this.api.getAllProducts().subscribe((result) => {
      this.productID = result.body.length + 1;
    })
    });

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

  uploadProduct(){
    this.saveData();
    let product = {
        "$class": "org.tfg.model.UploadProduct",
        "status": "CREATED",
        "owner": "resource:org.tfg.model.UserParticipant#" + this.user.userId,
        "name": this.productName,
        "description": this.description,
        "amount": this.price,
        "uploadDate": new Date()
    }
    this.api.uploadProduct(product).subscribe(
      result => {
        console.log(product)
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }

  close(){
    this.viewCtrl.dismiss();
  }

  addImage(){
    let alert = this.alertCtrl.create({
      title: "Nueva imagen",
      subTitle: "Elige el modo con el que añadir la nueva imagen",
      buttons: [
        {
          text: 'Foto',
          handler: () => {
            this.selectPhoto();
          }
        },
        {
          text: 'Cámara',
          handler: () => {
            this.takePhoto();
          }
        }
      ]
    })
    alert.present();
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
        this.contador = this.contador+1;
      });
  }

}
