import { ViewOfferPage } from './../view-offer/view-offer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShipmentDetailsPage } from './shipment-details/shipment-details';

@IonicPage()
@Component({
  selector: 'page-shipping',
  templateUrl: 'shipping.html',
})
export class ShippingPage {
  public section = 'made';

  public made;
  public received;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.section = 'made';

    this.made = [{"title": "Bicicleta"}]
    this.received = [{"title": "Bicicleta"}]

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShippingPage');
  }

  details(shipment){
    this.navCtrl.push(ViewOfferPage)
    //this.navCtrl.push(ShipmentDetailsPage);
  }

}
