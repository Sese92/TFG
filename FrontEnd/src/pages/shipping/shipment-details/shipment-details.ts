import { ApiClientService } from './../../../client/index';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-shipment-details',
  templateUrl: 'shipment-details.html',
})
export class ShipmentDetailsPage {
  qrText;
  public order;

  type;
  status;

  offerDate;
  offerAcceptedDate;
  offerRejectedDate;
  pickupDate;
  deliverDate;


  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiClientService) {

  }

  ionViewDidLoad() {
    this.order = this.navParams.get("order")
    console.log(this.order);
    this.status = this.order.status;

    if(this.order.orderId == undefined){
      this.type = "offer";
      let date = new Date(this.order.offerDate);
      console.log(date);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      this.offerDate = day + "/" + month + "/" + year;

      if(this.status == 'REJECTED'){
        let date = new Date(this.order.rejectedDate);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        this.offerRejectedDate = day + "/" + month + "/" + year;
      }
    }
    else{
      this.type = "order"
      let product = this.order.product.split('#');
      let productID = product[1]
      this.qrText = productID;
      console.log(this.qrText)
      let offer = this.order.offer.split('#');
      let offerID = offer[1]
      this.api.getOfferById(offerID).subscribe(
        result => {
          let date = new Date(result.body[0].offerDate);
          let day = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();
          this.offerDate = day + "/" + month + "/" + year;
          let date2 = new Date(result.body[0].acceptedDate);
          let day2 = date2.getDate();
          let month2 = date2.getMonth() + 1;
          let year2 = date2.getFullYear();
          this.offerAcceptedDate = day2 + "/" + month2 + "/" + year2;

          if (this.status == 'ONTHEWAY' || this.status == 'RECEIVED'){
            this.api.getProductById(productID).subscribe(
              result => {
                let date = new Date(result.body[0].receivedDate);
                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
                this.pickupDate = day + "/" + month + "/" + year;
                if(this.status == 'RECEIVED'){
                  let date = new Date(result.body[0].finishedDate);
                  let day = date.getDate();
                  let month = date.getMonth() + 1;
                  let year = date.getFullYear();
                  this.deliverDate = day + "/" + month + "/" + year;
                }
              }
            )
          }
        }
      )
    }
  }

}
