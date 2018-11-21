import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public step;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.step = this.navParams.get("step");
  }

  back(){
    this.navCtrl.pop();
  }

  next(){
    this.navCtrl.push(RegisterPage, {"step": 2});
  }
}
