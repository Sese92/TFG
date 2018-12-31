import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Register2Page } from '../register2/register2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public myForm: FormGroup;

  public email;
  public password;
  public repeatPassword;
  public name;
  public surname;
  public phone;


  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public toastCtrl: ToastController) {
    this.myForm = this.createMyForm();
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad RegisterPage');
  }

  createMyForm() {
    return this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\\.[A-Za-z]{2,4}')])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
      repeatPassword: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
      name: ["", Validators.compose([Validators.required, Validators.pattern('[A-Za-z]+')])],
      surname: ["", Validators.pattern('[A-Za-z]+')],
      phone: ["", Validators.compose([Validators.required, Validators.pattern('[0-9]+')])]
    });
  }

  saveData() {
    this.email = this.myForm.value.email;
    this.password = this.myForm.value.password;
    this.repeatPassword = this.myForm.value.repeatPassword;
    this.name = this.myForm.value.name;
    this.surname = this.myForm.value.surname;
    this.phone = this.myForm.value.phone;
  }

  next() {
    this.saveData();
    if (this.myForm.status != "VALID") {
      let toast = this.toastCtrl.create({
        message: 'Existen errores en algún campo',
        duration: 3000,
        position: 'top',
        dismissOnPageChange: true,
        cssClass: 'toastClass'
      });
      toast.present();
    }
    else {
      if (this.password == this.repeatPassword) {
        let data = {
          "email": this.email,
          "password": this.password,
          "name": this.name,
          "surname": this.surname,
          "phone": this.phone
        }
        this.navCtrl.push(Register2Page, { "data": data });

      }
      else {
        let toast = this.toastCtrl.create({
          message: 'Las contraseñas no coinciden',
          duration: 3000,
          position: 'top',
          dismissOnPageChange: true,
          cssClass: 'toastClass'
        });
        toast.present();
      }
    }
  }


}

