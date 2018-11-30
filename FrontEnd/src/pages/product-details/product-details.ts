import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Circle, GoogleMap, GoogleMaps, ILatLng } from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  public product;

  map: GoogleMap;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get("product");

  }

  ionViewDidLoad() {
    this.product = this.navParams.get("product");
    this.loadMap();
    console.log('ionViewDidLoad ProductDetailsPage');
  }

  loadMap(){
    this.map = GoogleMaps.create('map');


    let GOOGLE: ILatLng = {"lat" : 40.400560, "lng" : -3.703753};

    this.map.addCircle({
      'center': GOOGLE,
      'radius': 1200,
      'strokeColor' : 'rgb(2, 179, 81)',
      'strokeWidth': 3,
      'fillColor' : 'rgb(93, 255, 166, 0.5)'
    }).then((circle: Circle) => {
  
      // Fit the map camera to circle
      this.map.moveCamera({
        target: circle.getBounds()
      });
  
    });




  }


}
