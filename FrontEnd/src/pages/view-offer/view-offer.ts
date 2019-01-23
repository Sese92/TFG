import { ApiClientService } from './../../client/index';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-view-offer',
  templateUrl: 'view-offer.html',
})
export class ViewOfferPage {
  public offer;
  public user;
  public productName;
  public productPrice;

  public headquarters;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public alertCtrl: AlertController, public api: ApiClientService, public storage: Storage) {
    this.offer = this.navParams.get("offer")
    console.log(this.offer);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewOfferPage');
    let product = this.offer.product.split('#')
    let productID = product[1]

    this.storage.get('blockchainUser').then((user) => {
      this.user = user[0]
      console.log('user', this.user)
      this.api.getProductById(productID).subscribe(
        result => {
          let product = result.body[0];
          this.productName = product.name;
          this.productPrice = product.amount;
          console.log(product)
          this.api.getAllHeadQuarters().subscribe(
            result => {
              this.headquarters = result.body;
              console.log(this.headquarters)
            }
          )
        },
        error => {
          console.log(error);
        }

      )
    });
  }

  rejectOffer() {
    let loading = this.loadingCtrl.create({
      content: "Rechazando oferta..."
    })
    loading.present();
    let data = {
      "$class": "org.tfg.model.RejectOffer",
      "offer": "resource:org.tfg.model.Offer#" +  + this.offer.offerId,
      "rejectedDate": new Date()
    }
    this.api.rejectOffer(data).subscribe(
      result => {
        console.log(result);
        loading.dismiss();
        this.alert2();
      },
      error => {
        console.log(error);
        loading.dismiss();
      }
    )
  }

  aceptOffer() {
    let loading = this.loadingCtrl.create({
      content: "Aceptando oferta..."
    })
    loading.present();
    let userLatitude = this.user.address.latitude;
    let userLongitude = this.user.address.longitude;
    let distances = new Array();
    let headquarter;
    let carrier;

    for (let i = 0; i < this.headquarters.length; i++) {
      let headquarterLatitude = this.headquarters[i].address.latitude;
      let headquarterLongitude = this.headquarters[i].address.longitude;
      let distance = this.getDistanceFromLatLonInKm(userLatitude, userLongitude, headquarterLatitude, headquarterLongitude);
      if(i > 0){
        if(distances[i-1] > distance){
          headquarter = this.headquarters[i];
        }
      }
      distances.push(distance);
    }

    this.api.getAllCarriersByHeadquarter(headquarter.headquarterId).subscribe(
      result => {
        let random = Math.floor(Math.random() * 2 % 2);
        carrier = result.body[random];
        let data = {
          "$class": "org.tfg.model.AcceptOffer",
          "offer": "resource:org.tfg.model.Offer#" + this.offer.offerId,
          "carrier": "resource:org.tfg.model.Carrier#" + carrier.carrierId,
          "acceptedDate": new Date()
        }
        this.api.acceptOffer(data).subscribe(
          result => {
            loading.dismiss();
            this.alert(headquarter.headquarterName, carrier.carrierId);
          },
          error => {
            loading.dismiss();
            console.log(error);
          }
        )
      },
      error => {
        loading.dismiss();
        console.log(error);
      }
    )
    
  }

  alert(name, carrier){
    let alert = this.alertCtrl.create({
      title: "Oferta aceptada",
      subTitle: "Se ha creado una orden de envío para " + name + " y el transportista con ID " + carrier,
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

  alert2(){
    let alert = this.alertCtrl.create({
      title: "Oferta rechazada",
      subTitle: "La oferta ha sido rechazada",
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

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
   }

   deg2rad(deg) {
    return deg * (Math.PI/180)
   }

}
