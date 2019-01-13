import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth, public toastCtrl: ToastController) {
    console.log('Hello AuthProvider Provider');
  }

  login(credentials) {
    var promise = new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then((res) => {
        resolve(true);
      }).catch((err) => {
        console.log(err.code);
        if (err.code == "auth/invalid-email") {
          let error = "El formato del correo no es válido";
          this.toast(error);
          credentials.email = credentials.password = "";
        } else if (err.code == "auth/wrong-password") {
          let error = "La contraseña es incorrecta";
          this.toast(error);
          credentials.password = "";
        } else if (err.code == "auth/user-not-found") {
          let error = "El usuario no existe";
          this.toast(error);
          credentials.email = credentials.password = "";
        }
      })
    })
    return promise;


  }

  toast(error) {
    let toast = this.toastCtrl.create({
      message: error,
      duration: 3000,
      position: 'top',
      dismissOnPageChange: true,
      cssClass: 'toastClass'
    });
    toast.present();
  }

}
