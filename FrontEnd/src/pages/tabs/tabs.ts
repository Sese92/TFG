import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ProductsPage } from '../products/products';
import { ShippingPage } from '../shipping/shipping';
import { ChatPage } from '../chat/chat';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  productsRoot = ProductsPage
  shippingRoot = ShippingPage
  chatRoot = ChatPage
  profileRoot = ProfilePage


  constructor(public navCtrl: NavController) {}

}
