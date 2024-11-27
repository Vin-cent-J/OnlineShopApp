import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailbarangPage } from './detailbarang.page';

const routes: Routes = [
  {
    path: '',
    component: DetailbarangPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailbarangPageRoutingModule {}
