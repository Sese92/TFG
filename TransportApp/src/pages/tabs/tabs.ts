import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { NewPage } from '../new/new';
import { DeliveryPage } from '../delivery/delivery';
import { CompletedPage } from '../completed/completed';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  name;
  surname;

  newRoot = NewPage
  deliveryRoot = DeliveryPage
  completedRoot = CompletedPage


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public storage: Storage) {

  }

  ionViewDidLoad(){
    this.storage.get('carrierInfo').then((carrier) => {
      this.name = carrier[0].name;
      this.surname = carrier[0].surname;
    });
  }

  logout(){
    let alert = this.alertCtrl.create({
      title: 'Salir',
      message: '¿Estás seguro de que quieres salir de la aplicación?',
      buttons: [
        {
          text: 'NO',
        },
        {
          text: 'SI',
          handler: () => {
            this.navCtrl.setRoot(LoginPage)
          }
        }
      ]
    });
    alert.present();
  }

}
