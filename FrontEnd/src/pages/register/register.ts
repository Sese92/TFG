import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public step;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    console.log(document.getElementById('direction'));

    this.step = this.navParams.get("step");
    if(this.step == undefined){
      this.step = 1;
    }
    console.log('ionViewDidLoad RegisterPage');
/*     if(this.step == 2){
      console.log(document.getElementById('direction'));
      let input = document.getElementById('direction').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(input, {types: ['geocode']});
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        // retrieve the place object for your use
        let place = autocomplete.getPlace();
        let latitude = place.geometry.location.lat();
        let longitude = place.geometry.location.lng();
        console.log("latitude", latitude, "longitude", longitude);
      });
    } */
  }


  next(){
    if(this.step == 1){
      this.navCtrl.push(RegisterPage, {"step": this.step + 1});
    }
    else{
      this.navCtrl.popToRoot();
    }
  }
}
