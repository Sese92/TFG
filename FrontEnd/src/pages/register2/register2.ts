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
          let options = {
            requireExpiry: true,
            requireCVV: false,
            requirePostalCode: false
          };
          this.cardIO.scan(options);
        }
      }
    );
  }


}
