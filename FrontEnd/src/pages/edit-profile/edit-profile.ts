import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiClientService } from '../../client';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  public user;
  name;
  surname;
  numberPhone;
  address;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public api: ApiClientService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    this.storage.get('blockchainUser').then((user) => {
      console.log(user[0])
      this.user = user[0];
      this.name = this.user.name;
      this.surname = this.user.surname;
      this.numberPhone = this.user.numberPhone;
      this.address = this.user.address.address;

    });
  }

  saveChanges(){
    let data = {}
    this.api.updateProfile(data).subscribe(
      result => {

      },error => {

      }
    )
  }

}
