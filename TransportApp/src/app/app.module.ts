import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DeliveryCompletedPage } from './../pages/delivery-completed/delivery-completed';
import { CompletedPage } from './../pages/completed/completed';
import { DeliveryPage } from './../pages/delivery/delivery';
import { TabsPage } from './../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { NewPage } from '../pages/new/new';
import { PickupCompletedPage } from '../pages/pickup-completed/pickup-completed';
import { ApiClientService } from '../client';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    NewPage,
    DeliveryPage,
    CompletedPage,
    PickupCompletedPage,
    DeliveryCompletedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    NewPage,
    DeliveryPage,
    CompletedPage,
    PickupCompletedPage,
    DeliveryCompletedPage
  ],
  providers: [
    StatusBar,
    ApiClientService,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
