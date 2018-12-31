import { EditProfilePage } from './../pages/edit-profile/edit-profile';
import { MakeOfferPage } from './../pages/make-offer/make-offer';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { ShipmentDetailsPage } from './../pages/shipping/shipment-details/shipment-details';
import { ConversationPage } from './../pages/conversation/conversation';
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
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NewProductPage } from '../pages/new-product/new-product';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { ChatProvider } from '../providers/chat/chat';
import { Camera } from '@ionic-native/camera'
import { ApiClientService } from '../client';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    Register2Page,
    TabsPage,
    ProductsPage,
    NewProductPage,
    ShippingPage,
    ShipmentDetailsPage,
    ChatPage,
    ConversationPage,
    ProfilePage,
    ProductDetailsPage,
    MakeOfferPage,
    EditProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonIcon: "ios-arrow-back",
      tabsHideOnSubPages: true,
      pageTransition: 'ios-transition'
    }),
    IonicStorageModule.forRoot(),
    NgxQRCodeModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    Register2Page,
    TabsPage,
    ProductsPage,
    NewProductPage,
    ShippingPage,
    ShipmentDetailsPage,
    ChatPage,
    ConversationPage,
    ProfilePage,
    ProductDetailsPage,
    MakeOfferPage,
    EditProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CardIO,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserProvider,
    ChatProvider,
    Camera,
    ApiClientService
  ]
})
export class AppModule {}
