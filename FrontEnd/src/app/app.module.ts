import { ProfilePage } from './../pages/profile/profile';
import { ChatPage } from './../pages/chat/chat';
import { ShippingPage } from './../pages/shipping/shipping';
import { ProductsPage } from './../pages/products/products';
import { Register2Page } from './../pages/register2/register2';
import { TabsPage } from './../pages/tabs/tabs';
import { RegisterPage } from './../pages/register/register';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { CardIO } from '@ionic-native/card-io';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { GoogleMaps } from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    Register2Page,
    TabsPage,
    ProductsPage,
    ShippingPage,
    ChatPage,
    ProfilePage,
    ProductDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonIcon: "ios-arrow-back",
      tabsHideOnSubPages: true,
      pageTransition: 'ios-transition'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    Register2Page,
    TabsPage,
    ProductsPage,
    ShippingPage,
    ChatPage,
    ProfilePage,
    ProductDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CardIO,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
