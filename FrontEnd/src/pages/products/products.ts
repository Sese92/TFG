import { ApiClientService } from './../../client/index';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import { NewProductPage } from '../new-product/new-product';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  public products;
  public filterList;

  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams, public modalCtrl: ModalController, public api: ApiClientService) {
  }

  ionViewDidLoad() {
    this.storage.get('blockchainUser').then((user) => {
      console.log(user);
      this.api.getProducts(user[0].userId).subscribe((result) => {
        this.products = result.body;
        console.log(this.products)
        this.initializeItems();
      },
      error => {
        console.log(error);
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
      if (v.title && q) {
        if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
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

}
