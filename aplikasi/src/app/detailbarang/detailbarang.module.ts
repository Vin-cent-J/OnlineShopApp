import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailbarangPageRoutingModule } from './detailbarang-routing.module';

import { DetailbarangPage } from './detailbarang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailbarangPageRoutingModule
  ],
  declarations: [DetailbarangPage]
})
export class DetailbarangPageModule {}
