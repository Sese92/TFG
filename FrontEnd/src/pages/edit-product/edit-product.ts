import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
  public productName;
  public description;
  public price;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.productName = "Figura Assassins Creed";
    this.description = "Figura del videojuego assassins creed"
    this.price = "20"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductPage');
  }

}
