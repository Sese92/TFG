import { MakeOfferPage } from './../make-offer/make-offer';
import { ApiClientService } from './../../client/index';
import { UserProvider } from './../../providers/user/user';
import { ConversationPage } from './../conversation/conversation';
import { ChatProvider } from './../../providers/chat/chat';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Circle, GoogleMap, GoogleMaps, ILatLng } from '@ionic-native/google-maps';
import { Storage } from '@ionic/storage';
import firebase from 'firebase'


@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  public product;
  public extra;

  map: GoogleMap;

  public owner;
  public ownerID;
  public ownerName;
  public ownerLatitude;
  public ownerLongitude


  constructor(public navCtrl: NavController, public api: ApiClientService, public storage: Storage, public navParams: NavParams, public chatservice: ChatProvider, public userservice: UserProvider) {
    this.product = this.navParams.get("product");

  }

  ionViewDidLoad() {
    this.product = this.navParams.get("product");
    this.storage.get('blockchainUser').then((user) => {
      let userLatitude = user[0].address.latitude;
      let userLongitude = user[0].address.longitude;

      let owner = (this.product.owner).split('#')
      this.ownerID = owner[1]
      this.api.getUserById(this.ownerID).subscribe(
        result => {
          this.ownerName = result.body[0].name + " " + result.body[0].surname;
          let ownerLatitude = result.body[0].address.latitude;
          let ownerLongitude = result.body[0].address.longitude;
          let distance = this.getDistanceFromLatLonInKm(userLatitude, userLongitude, ownerLatitude, ownerLongitude);
          let extra2 = Math.ceil(distance) * 0.05;
          this.extra = Math.floor(extra2);
          this.loadMap(ownerLatitude, ownerLongitude);
          
          var storage = firebase.storage().ref('/Products/');
          this.product["images"] = new Array();
          for (let j = 0; j < this.product.numberOfImages; j++) {
            var pathReference = storage.child((this.product.productId).toString() + "/" + j + ".png");
            var this2 = this;
            pathReference.getDownloadURL().then(function (url) {
              this2.product.images.push(url);
            });
          }
        }
        , error => {
          console.log(error);
        }
      )
    });

    console.log('ionViewDidLoad ProductDetailsPage');

  }

  makeOffer() {
    this.navCtrl.push(MakeOfferPage, { "product": this.product, "extra": this.extra })
  }

  chat() {
    this.userservice.getUserByUID(this.ownerID).then((user) => {
      console.log("id", this.ownerID)
      this.owner = user[0];
      console.log(this.owner)
      this.chatservice.initializeChat(this.owner)
      this.navCtrl.push(ConversationPage)
    })

  }

  loadMap(lat, lon) {
    this.map = GoogleMaps.create('map');

    let GOOGLE: ILatLng = { "lat": +lat, "lng": +lon };

    this.map.addCircle({
      'center': GOOGLE,
      'radius': 1200,
      'strokeColor': 'rgb(2, 179, 81)',
      'strokeWidth': 3,
      'fillColor': 'rgb(93, 255, 166, 0.5)'
    }).then((circle: Circle) => {

      // Fit the map camera to circle
      this.map.moveCamera({
        target: circle.getBounds()
      });
    });
  }

  //Funciones para calcular la distancia entre puntos
  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    console.log(d, "km")
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }


}
