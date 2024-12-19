import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MerekPage } from './merek.page';

const routes: Routes = [
  {
    path: '',
    component: MerekPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerekPageRoutingModule {}
