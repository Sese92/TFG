import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var google: any;
import { CardIO } from '@ionic-native/card-io';



@IonicPage()
@Component({
  selector: 'page-register2',
  templateUrl: 'register2.html',
})
export class Register2Page {
  public name;
  public number;
  public numberChanged;
  public cvvChanged;
  public date;
  public cvv;
  public accountNumber;

  constructor(public navCtrl: NavController, public navParams: NavParams, private cardIO: CardIO) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad Register2Page');
    console.log(document.getElementById('direction'));
    let input = document.getElementById('direction').getElementsByTagName('input')[0];
    let autocomplete = new google.maps.places.Autocomplete(input, { types: ['geocode'] });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      // retrieve the place object for your use
      let place = autocomplete.getPlace();
      let latitude = place.geometry.location.lat();
      let longitude = place.geometry.location.lng();
      console.log("latitude", latitude, "longitude", longitude);
    });

  }

  scan(){
    this.cardIO.canScan()
    .then(
      (res: boolean) => {
        if(res){
          var options = {
            scanInstructions: "Escanee la parte frontal de su Tarjeta",
            scanCardHolderName: true,
            keepApplicationTheme:true,
            hideCardIOLogo: true,
            useCardIOLogo:false,
            scanExpiry: true,
            requireExpiry: true,
            requireCVV: true,
            requireCardholderName: true
          };
          this.cardIO.scan(options).then((data) =>{
            this.name = data.cardholderName;
            this.number = data.cardNumber;
            this.date = data.expiryMonth + "/" + data.expiryYear;
            this.cvv = data.cvv;
            this.numberChanged = "**** **** **** " + this.number.substring(12, 16);
            this.cvvChanged = "***"
          });
        }
      }
    );
  }


}
