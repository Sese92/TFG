import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiClientService } from '../../client';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  public user;
  name;
  surname;
  numberPhone;
  address;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navParams: NavParams, public storage: Storage, public api: ApiClientService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    this.storage.get('blockchainUser').then((user) => {
      console.log(user[0])
      this.user = user[0];
      this.name = this.user.name;
      this.surname = this.user.surname;
      this.numberPhone = this.user.numberPhone;
    });
  }

  saveChanges(){
    let loading = this.loadingCtrl.create({
      content: "Editando perfil..."
    })
    loading.present();
    let data = {
        "$class": "org.tfg.model.UpdateProfile",
        "user": "resource:org.tfg.model.UserParticipant#" + this.user.userId,
        "name": this.name,
        "surname": this.surname,
        "numberPhone": this.numberPhone
    }
    
    this.api.updateProfile(data).subscribe(
      result => {
        console.log(result);
        loading.dismiss();
        this.profileUpdated();
      },error => {
        console.log(error);
        loading.dismiss()

      }
    )
  }

  profileUpdated(){
    let alert = this.alertCtrl.create({
      title: "Perfil editado",
      subTitle: "Tu perfil ha sido modificado correctamente",
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

}
