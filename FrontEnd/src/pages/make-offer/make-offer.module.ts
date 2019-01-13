import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MakeOfferPage } from './make-offer';

@NgModule({
  declarations: [
    MakeOfferPage,
  ],
  imports: [
    IonicPageModule.forChild(MakeOfferPage),
  ],
})
export class MakeOfferPageModule {}
