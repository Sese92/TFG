import { ApiClientService } from './../../client/index';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
declare var google: any;
import { CardIO } from '@ionic-native/card-io';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-register2',
  templateUrl: 'register2.html',
})
export class Register2Page {
  public data;

  public cardName;
  public cardNumber;
  public numberChanged;
  public cvvChanged;
  public cardDate;
  public cardCvv;
  public accountNumber;
  public latitude;
  public longitude;
  public address;


  constructor(public navCtrl: NavController, public navParams: NavParams, private cardIO: CardIO, private _auth: AngularFireAuth,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public userService: UserProvider, public api: ApiClientService) {
    this.data = this.navParams.get("data");
    console.log(this.data);
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad Register2Page');
    let input = document.getElementById('direction').getElementsByTagName('input')[0];
    let autocomplete = new google.maps.places.Autocomplete(input, { types: ['geocode'] });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      // retrieve the place object for your use
      let place = autocomplete.getPlace();
      this.latitude = place.geometry.location.lat();
      this.longitude = place.geometry.location.lng();
      this.address = place.formatted_address
      console.log("latitude", this.latitude, "longitude", this.longitude);
    });

  }

  scan() {
    this.cardIO.canScan()
      .then(
        (res: boolean) => {
          if (res) {
            var options = {
              scanInstructions: "Escanee la parte frontal de su Tarjeta",
              scanCardHolderName: true,
              keepApplicationTheme: true,
              hideCardIOLogo: true,
              useCardIOLogo: false,
              scanExpiry: true,
              requireExpiry: true,
              requireCVV: true,
              requireCardholderName: true
            };
            this.cardIO.scan(options).then((data) => {
              this.cardName = data.cardholderName;
              this.cardNumber = data.cardNumber;
              this.cardDate = data.expiryMonth + "/" + data.expiryYear;
              this.cardCvv = data.cvv;
              this.numberChanged = "**** **** **** " + this.cardNumber.substring(12, 16);
              this.cvvChanged = "***"
            });
          }
        }
      );
  }

  async register() {
    let loading = this.loadingCtrl.create({
      content: "Creando usuario..."
    })
    loading.present();
    let data = {
      "email": this.data.email,
      "password": this.data.password,
      "displayName": this.data.name
    }
    this.userService.adduser(data).then((res: any) => {
      if(res.success){
        var user={
          "$class": "org.tfg.model.CreateUser",
          "userId": this._auth.auth.currentUser.uid,
          "email": this.data.email,
          "name": this.data.name,
          "surname": this.data.surname,
          "numberPhone": this.data.phone,
          "card": {
            "owner": this.cardName,
            "cardNumber": this.cardNumber,
            "expiryDate": this.cardDate,
            "cvv": this.cardCvv
          },
          "account": {
            "owner": this.cardName,
            "accountNumber": this.accountNumber
          },
          "address": {
            "latitude": this.latitude,
            "longitude": this.longitude,
            "address": this.address
          }
        }
        console.log(user);
        this.api.createUser(user).subscribe(
          result=>{
            console.log(result);
            loading.dismiss();
            this.alert();
          },
          error=>{
            console.log(<any>error);
            loading.dismiss();
          });
      }
      
      else{
        console.log(res);
        loading.dismiss();
      }
    })
  }

  alert() {
    let alert = this.alertCtrl.create({
      title: "Usuario creado correctamente",
      subTitle: "Ya puedes entrar en la aplicación con tu usuario",
      buttons: [
        {
          text: 'OK',
          role: 'OK',
          handler: () => {
            this.navCtrl.popToRoot();
          }
        }
      ]
    })
    alert.present();
  }
}
