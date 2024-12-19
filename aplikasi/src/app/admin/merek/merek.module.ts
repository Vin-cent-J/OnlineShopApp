import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MerekPageRoutingModule } from './merek-routing.module';

import { MerekPage } from './merek.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MerekPageRoutingModule
  ],
  declarations: [MerekPage]
})
export class MerekPageModule {}
