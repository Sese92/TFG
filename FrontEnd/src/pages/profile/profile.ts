import { ApiClientService } from './../../client/index';
import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EditProfilePage } from '../edit-profile/edit-profile';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public user;
  public name;
  public surname;
  public products;

  constructor(public navCtrl: NavController, public events: Events, public api: ApiClientService, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.storage.get('blockchainUser').then((user) => {
      console.log(user)
      this.user = user[0]
      this.name = this.user.name;
      this.surname = this.user.surname;
      this.api.getMyProducts(this.user.userId).subscribe((result) => {
        this.products = result.body;
      },
      error => {
        console.log(error);
      })
    });
  }

  edit(){
    this.navCtrl.push(EditProfilePage)
  }

  logout(){
    this.events.publish('logout');
  }

}
