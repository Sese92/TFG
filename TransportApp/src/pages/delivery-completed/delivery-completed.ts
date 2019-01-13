import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-delivery-completed',
  templateUrl: 'delivery-completed.html',
})
export class DeliveryCompletedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryCompletedPage');
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
