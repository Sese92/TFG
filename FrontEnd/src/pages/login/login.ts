import { ApiClientService } from './../../client/index';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';

import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email;
  public password;

  constructor(public api: ApiClientService, public storage: Storage, public loadingCtrl: LoadingController, public navCtrl: NavController, private authservice: AuthProvider, private _auth: AngularFireAuth, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {

    var user = {
      "email": this.email,
      "password": this.password
    }
    if (user.email == undefined || user.email == "" || user.password == undefined || user.password == "") {
      let toast = this.toastCtrl.create({
        message: "No puede haber campos vacíos",
        duration: 3000,
        position: 'top',
        dismissOnPageChange: true,
        cssClass: 'toastClass'
      });
      toast.present();
    }
    else {


      this.authservice.login(user).then((res: any) => {
        let loading = this.loadingCtrl.create({
          content: "Iniciando sesión..."
        })
        loading.present();
        let userInformation = {
          "$class": "org.tfg.model.Login",
          "user": "resource:org.tfg.model.UserParticipant#" + this._auth.auth.currentUser.uid
        }
        this.api.Login(userInformation).subscribe(
          result => {
            console.log(result);
            this.api.getUserById(this._auth.auth.currentUser.uid).subscribe(
              result => {
                console.log(result);
                this.storage.set("blockchainUser", result.body);
                loading.dismiss();
                this.navCtrl.setRoot(TabsPage)
              },
              error => {
                console.log(error);
              }
            )

          },
          error => {
            console.log(error);
            loading.dismiss();
            this.toast();
            this.email = this.password = "";
          }
        )},
        (err) => {
          console.log(err.code);
        })
    }

  }

  toast() {
    let toast = this.toastCtrl.create({
      message: "El usuario introducido no existe",
      duration: 2000,
      position: 'top',
      dismissOnPageChange: true,
      cssClass: "toastClass"
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

}
