import { ApiClientService } from './../../client/index';
import { DeliveryCompletedPage } from './../delivery-completed/delivery-completed';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {
  public packageList;

  constructor(public navCtrl: NavController, public storage: Storage, public loadingCtrl: LoadingController, public api: ApiClientService, public barcodeScanner: BarcodeScanner, public modalCtrl: ModalController, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryPage');
    let loading = this.loadingCtrl.create({
      content: "Cargando..."
    })
    loading.present();
    this.packageList = new Array();
    console.log('ionViewDidLoad NewPage');
    this.storage.get('carrierInfo').then((carrier) => {
      let carrierInfo = carrier[0]
      let carrierID = carrierInfo.carrierId;
      this.api.getOrdersByStatusAndCarrierId(carrierID, 'ONTHEWAY').subscribe(
        result => {
          let orders = result.body;
          console.log(orders)
          for (let i = 0; i < orders.length; i++) {
            let buyer = (orders[i].buyer).split('#')
            let buyerId = buyer[1]

            this.api.getUserById(buyerId).subscribe(
              result => {
                var buyerAddress = result.body[0].address.address;
                let product = (orders[i].product).split('#')
                let productId = product[1]
                this.api.getProductById(productId).subscribe(
                  result => {
                    var productName = result.body[0].name;
                    let order = {
                      "buyerAddress": buyerAddress,
                      "productName": productName,
                      "productID": productId,
                      "orderID": orders[i].orderId
                    }
                    this.packageList.push(order);
                  }
                )
              }
            )


          }
          loading.dismiss()
        }
      )
    })
  }

  doRefresh(refresher){
    this.packageList = new Array();
    console.log('ionViewDidLoad NewPage');
    this.storage.get('carrierInfo').then((carrier) => {
      let carrierInfo = carrier[0]
      let carrierID = carrierInfo.carrierId;
      this.api.getOrdersByStatusAndCarrierId(carrierID, 'ONTHEWAY').subscribe(
        result => {
          let orders = result.body;
          console.log(orders)
          for (let i = 0; i < orders.length; i++) {
            let buyer = (orders[i].buyer).split('#')
            let buyerId = buyer[1]

            this.api.getUserById(buyerId).subscribe(
              result => {
                var buyerAddress = result.body[0].address.address;
                let product = (orders[i].product).split('#')
                let productId = product[1]
                this.api.getProductById(productId).subscribe(
                  result => {
                    var productName = result.body[0].name;
                    let order = {
                      "buyerAddress": buyerAddress,
                      "productName": productName,
                      "productID": productId,
                      "orderID": orders[i].orderId
                    }
                    this.packageList.push(order);
                  }
                )
              }
            )
          }
          refresher.complete();
        }
      )
    })
  }

  scanQR(p) {
    let loading = this.loadingCtrl.create({
      content: "Cargando..."
    })
    loading.present();
    console.log(p);
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (barcodeData.text == p.productID) {
        let order = {
          "$class": "org.tfg.model.DeliverProduct",
          "order": "resource:org.tfg.model.Order#" + p.orderID,
          "finishedDate": new Date()
        }
        this.api.deliverProduct(order).subscribe(
          result => {
            console.log(result);
            loading.dismiss();
            let modal = this.modalCtrl.create(DeliveryCompletedPage);
            modal.present();
          },
          error => {
            loading.dismiss();
            console.log(error);
          }
        )
      }
      else {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Producto incorrecto',
          message: 'Este no es el producto que pertenece al pedido especificado',
          buttons: [
            {
              text: 'OK',
            }
          ]
        });
        alert.present();
      }

    }).catch(err => {

    });
  }

}
