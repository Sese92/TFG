import { ApiClientService } from './../../client/index';
import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EditProfilePage } from '../edit-profile/edit-profile';
import firebase from 'firebase'
import { EditProductPage } from '../edit-product/edit-product';


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
        var storage = firebase.storage().ref('/Products/');
        
        for (let i = 0; i < this.products.length; i++) {
          this.products[i]["images"] = new Array();
          console.log(this.products[i])
          var pathReference = storage.child((this.products[i].productId).toString() + "/0.png");
          console.log(pathReference)
          pathReference.getDownloadURL().then(function(url) {
            console.log(url);
            
            console.log(this.products[i])
        });
      }
      },
      error => {
        console.log(error);
      })
    });
  }

  edit(){
    this.navCtrl.push(EditProfilePage)
  }

  editProduct(){
    this.navCtrl.push(EditProductPage);
  }

  logout(){
    this.events.publish('logout');
  }

}
