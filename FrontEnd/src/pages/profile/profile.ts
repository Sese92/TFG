import { ApiClientService } from './../../client/index';
import { Component } from '@angular/core';
import { IonicPage, NavController, Events, LoadingController } from 'ionic-angular';
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


  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public events: Events, public api: ApiClientService, public storage: Storage) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: "Cargando..."
    })
    loading.present();
    console.log('ionViewDidLoad ProfilePage');
    this.storage.get('blockchainUser').then((user) => {
      this.user = user[0]
      this.name = this.user.name;
      this.surname = this.user.surname;
      this.api.getMyProducts(this.user.userId).subscribe((result) => {
        this.products = result.body;
        var storage = firebase.storage().ref('/Products/');
        console.log(this.products)
        for (let i = 0; i < this.products.length; i++) {
          this.products[i]["images"] = new Array();
          for (let j = 0; j < this.products[i].numberOfImages; j++) {
            var pathReference = storage.child((this.products[i].productId).toString() + "/" + j + ".png");
            var this2 = this;
            pathReference.getDownloadURL().then(function (url) {
              this2.products[i].images.push(url);
              console.log(this2.products);
            });

          }

        }
        loading.dismiss();
      },
        error => {
          console.log(error);
          loading.dismiss();
        })
    });
  }

  doRefresh(refresher) {
    this.products = new Array();
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
          for (let j = 0; j < this.products[i].numberOfImages; j++) {
            var pathReference = storage.child((this.products[i].productId).toString() + "/" + j + ".png");
            var this2 = this;
            pathReference.getDownloadURL().then(function (url) {
              this2.products[i].images.push(url);
              console.log(this2.products);
            });

          }

        }
        refresher.complete();
      },
        error => {
          console.log(error);
          refresher.complete();
        })
    });

  }

  edit() {
    this.navCtrl.push(EditProfilePage)
  }

  editProduct(product) {
    this.navCtrl.push(EditProductPage, { "product": product });
  }

  logout() {
    this.events.publish('logout');
  }

}
