import { ApiClientService } from '../../client/index';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
  public product;
  public productId;
  public productName;
  public description;
  public price;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navParams: NavParams, public api: ApiClientService) {
    this.product = this.navParams.get("product");
    this.productId = this.product.productId;
    this.productName = this.product.name;
    this.description = this.product.description;
    this.price = this.product.amount;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductPage');
  }

  updateProduct(){
    let loading = this.loadingCtrl.create({
      content: "Modificando tu producto..."
    })
    loading.present();
    let data = {
      "$class": "org.tfg.model.UpdateProduct",
      "product": "resource:org.tfg.model.Product#" + this.productId,
      "name": this.productName,
      "description": this.description,
      "amount": this.price
    }
    console.log(data);
    this.api.updateProduct(data).subscribe(
      result => {
        console.log(result);
        loading.dismiss();
        this.productUpdated();
      },
      error => {
        console.log(error);
        loading.dismiss()
      }
    )
  }

  productUpdated(){
    let alert = this.alertCtrl.create({
      title: "Producto editado",
      subTitle: "Tu producto ha sido modificado correctamente",
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.pop();
          }
        },
      ]
    })
    alert.present();
  }

}
