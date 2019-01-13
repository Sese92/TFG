import { ApiClientService } from './../../client/index';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-make-offer',
  templateUrl: 'make-offer.html',
})
export class MakeOfferPage {
  userID;
  public product;
  public extra;

  withoutSending;
  sending;

  disabledWithoutSending = true;
  disabledSending = true;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public storage: Storage, public navParams: NavParams, public alertCtrl: AlertController, public api: ApiClientService) {
    this.product = this.navParams.get("product")
    this.extra = this.navParams.get("extra")

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakeOfferPage');
    this.storage.get('blockchainUser').then((user) => {
      this.userID = user[0].userId;
    });
  }

  changeWithoutSending(offer){
    if(offer >= this.product.amount){
      this.disabledWithoutSending = false;
    }
    else{
      this.disabledWithoutSending = true;
    }
  }

  changeSending(offer){
    if(offer >= (this.product.amount + this.extra)){
      this.disabledSending = false;
    }
    else{
      this.disabledSending = true;
    }
  }

  offer(offerAmount, offerType){
    let alert = this.alertCtrl.create({
      title: "Realizar oferta",
      subTitle: "¿Estás seguro de que deseas hacer una oferta de " + offerAmount + " €?",
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.makeOffer(offerAmount, offerType);
          }
        },
        {
          text: 'No',
          role: 'CANCEL',
          handler: () => {
          }
        }
      ]
    })
    alert.present();
  }

  makeOffer(amount, offerType){
    let loading = this.loadingCtrl.create({
      content: "Realizando oferta..."
    })
    loading.present();
    var shippingPrice;
    var type;
    if(offerType == 'WITHOUTSHIPPING'){
      shippingPrice = 0;
      type = 'WITHOUTSHIPPING'
    }
    else {
      shippingPrice = this.extra;
      type = 'WITHSHIPPING'
    }

    let offer = 
    {
      "$class": "org.tfg.model.MakeOffer",
      "product": "resource:org.tfg.model.Product#" + this.product.productId,
      "buyer": "resource:org.tfg.model.UserParticipant#" + this.userID,
      "offerDate": new Date(),
      "amount": amount - shippingPrice,
      "offerType": type,
      "shippingPrice": shippingPrice,
      "status": "DONE"
    }
    this.api.makeOffer(offer).subscribe(
      result => {
        console.log(result);
        loading.dismiss();
        this.offerDone()
      },
      error => {
        console.log(error);
        loading.dismiss()
      }
    )
  }

  offerDone(){
    let alert = this.alertCtrl.create({
      title: "Oferta realizada",
      subTitle: "Has realizado una oferta por este producto. Puedes ver su estado en el apartado 'Envíos'",
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.popToRoot();
          }
        },
      ]
    })
    alert.present();
  }

}
