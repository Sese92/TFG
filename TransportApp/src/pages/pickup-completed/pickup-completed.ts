import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pickup-completed',
  templateUrl: 'pickup-completed.html',
})
export class PickupCompletedPage {
  address;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.address = this.navParams.get("buyerAddress")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickupCompletedPage');
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
