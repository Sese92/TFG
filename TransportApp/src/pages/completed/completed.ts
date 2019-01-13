import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiClientService } from '../../client';


@IonicPage()
@Component({
  selector: 'page-completed',
  templateUrl: 'completed.html',
})
export class CompletedPage {
  public packageList;

  constructor(public navCtrl: NavController, public storage: Storage, public loadingCtrl: LoadingController, public api: ApiClientService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletedPage');
    let loading = this.loadingCtrl.create({
      content: "Cargando..."
    })
    loading.present();
    this.packageList = new Array();
    console.log('ionViewDidLoad CompletedPage');
    this.storage.get('carrierInfo').then((carrier) => {
      let carrierInfo = carrier[0]
      let carrierID = carrierInfo.carrierId;
      this.api.getOrdersByStatusAndCarrierId(carrierID, 'RECEIVED').subscribe(
        result => {
          let orders = result.body;
          console.log(orders)
          for (let i = 0; i < orders.length; i++) {
            let product = (orders[i].product).split('#')
            let productId = product[1]
//QUERY
                var productName = "Figura Assassins Creed"
                let order = {
                  "productName": productName,
                }
                this.packageList.push(order);
             
          }
          loading.dismiss()
        }
      )
    })
  }

}
