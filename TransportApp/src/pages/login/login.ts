import { ApiClientService } from './../../client/index';
import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public carriers;
  public carrierID;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public api: ApiClientService, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.api.getCarrierById(this.carrierID).subscribe(result => {
      console.log(result.body);
      this.storage.set("carrierInfo", result.body);
      this.navCtrl.setRoot(TabsPage)
    },error =>{
      console.log(error);
      let toast = this.toastCtrl.create({
        message: "El usuario introducido no existe",
        duration: 3000,
        position: 'top',
        dismissOnPageChange: true,
        cssClass: 'toastClass'
      });
      toast.present();
    });
  }

}
