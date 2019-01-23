import { ApiClientService } from './../../client/index';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import { NewProductPage } from '../new-product/new-product';
import { Storage } from '@ionic/storage';
import firebase from 'firebase'


@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  public products;
  public filterList;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public storage: Storage, public navParams: NavParams, public modalCtrl: ModalController, public api: ApiClientService) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: "Cargando..."
    })
    loading.present();
    this.products = new Array();
    this.storage.get('blockchainUser').then((user) => {
      console.log(user);
      this.api.getProducts(user[0].userId).subscribe((result) => {
        this.products = result.body;
        console.log(this.products);
        var storage = firebase.storage().ref('/Products/');
        console.log(this.products)
        for (let i = 0; i < this.products.length; i++) {
          this.products[i]["images"] = new Array();
          console.log(this.products[i]);
          for (let j = 0; j < this.products[i].numberOfImages; j++) {
            var pathReference = storage.child((this.products[i].productId).toString() + "/" + j + ".png");
            console.log("HEY")
            var this2 = this;
            pathReference.getDownloadURL().then(function (url) {
              this2.products[i].images.push(url);
              console.log(this2.products);
            });

          }

        }
        this.initializeItems();
        loading.dismiss();
      },
      error => {
        console.log(error);
        loading.dismiss();
      })
    });

    console.log('ionViewDidLoad ProductsPage');
  }

  initializeItems(): void {
    this.filterList = this.products;
  }

  onInput(searchbar) {
    this.initializeItems();
    var q = searchbar.srcElement.value;
    if (!q) {
      return;
    }

    this.filterList = this.filterList.filter((v) => {
      if (v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  cardDetails(product){
    this.navCtrl.push(ProductDetailsPage, {"product": product});
  }

  newProduct(){
    let modal = this.modalCtrl.create(NewProductPage);
    modal.present();
  }

  doRefresh(refresher) {
    this.products = new Array();
    this.storage.get('blockchainUser').then((user) => {
      console.log(user);
      this.api.getProducts(user[0].userId).subscribe((result) => {
        this.products = result.body;
        console.log(this.products);
        var storage = firebase.storage().ref('/Products/');
        console.log(this.products)
        for (let i = 0; i < this.products.length; i++) {
          this.products[i]["images"] = new Array();
          console.log(this.products[i]);
          for (let j = 0; j < this.products[i].numberOfImages; j++) {
            var pathReference = storage.child((this.products[i].productId).toString() + "/" + j + ".png");
            console.log("HEY")
            var this2 = this;
            pathReference.getDownloadURL().then(function (url) {
              this2.products[i].images.push(url);
              console.log(this2.products);
            });

          }

        }
        this.initializeItems();
        refresher.complete();
      },
      error => {
        console.log(error);
      })
    });
  }

}
