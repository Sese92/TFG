import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShipmentDetailsPage } from './shipment-details';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    ShipmentDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShipmentDetailsPage),
    NgxQRCodeModule
  ],
})
export class ShipmentDetailsPageModule {}
