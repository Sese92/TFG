import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-shipment-details',
  templateUrl: 'shipment-details.html',
})
export class ShipmentDetailsPage {
  qrText = "Jose Daniel Jiménez";


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShipmentDetailsPage');
  }

}
