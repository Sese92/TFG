import { ApiClientService } from './../../client/index';
import { PickupCompletedPage } from './../pickup-completed/pickup-completed';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-new',
  templateUrl: 'new.html',
})
export class NewPage {
  public packageList;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public storage: Storage, public api: ApiClientService, public alertCtrl: AlertController, private barcodeScanner: BarcodeScanner, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: "Cargando..."
    })
    loading.present();
    this.packageList = new Array();
    console.log('ionViewDidLoad NewPage');
    this.storage.get('carrierInfo').then((carrier) => {
      let carrierInfo = carrier[0]
      let carrierID = carrierInfo.carrierId;
      this.api.getOrdersByStatusAndCarrierId(carrierID, 'WAITING').subscribe(
        result => {
          let orders = result.body;
          console.log(orders)
          for (let i = 0; i < orders.length; i++) {
            let buyer = (orders[i].buyer).split('#')
            let buyerId = buyer[1]
            let seller = (orders[i].seller).split('#')
            let sellerId = seller[1]
            this.api.getUserById(buyerId).subscribe(
              result => {
                var buyerAddress = result.body[0].address.address;
                this.api.getUserById(sellerId).subscribe(
                  result1 => {
                    var sellerAddress = result1.body[0].address.address;
                    let product = (orders[i].product).split('#')
                    let productId = product[1]
//QUERY
                        var productName = "Figura Assassins Creed"
                        let order = {
                          "sellerAddress": sellerAddress,
                          "buyerAddress": buyerAddress,
                          "productName": productName,
                          "productID": productId,
                          "orderID": orders[i].orderId
                        }
                        this.packageList.push(order);
                        console.log(this.packageList)
                      
                    
                  }
                )
              },
              error => {
                console.log(error);
                loading.dismiss();
              }
            )
          }
          loading.dismiss()
        },
        error => {
          console.log(error);
          loading.dismiss();
        }
      )
    })
  }

  scanQR(p){
    let loading = this.loadingCtrl.create({
      content: "Cargando..."
    })
    loading.present();
    console.log(p);
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if(barcodeData.text == p.productID){
        let order = {
          "$class": "org.tfg.model.PickUpProduct",
          "order": "resource:org.tfg.model.Order#" + p.orderID
        }
        this.api.pickUpProduct(order).subscribe(
          result => {
            loading.dismiss();
            let modal = this.modalCtrl.create(PickupCompletedPage, {"buyerAddress": p.buyerAddress});
            modal.present();
          },
          error => {
            console.log(error);
            loading.dismiss();
          }
        )
      }
      else{
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
