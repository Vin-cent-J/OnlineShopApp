import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'barang',
    loadChildren: () => import('./barang/barang.module').then( m => m.BarangPageModule)
  },
  {
    path: 'barang/:halaman',
    loadChildren: () => import('./barang/barang.module').then( m => m.BarangPageModule)
  },
  {
    path: 'merek',
    loadChildren: () => import('./merek/merek.module').then( m => m.MerekPageModule)
  },
  {
    path: 'kategori',
    loadChildren: () => import('./kategori/kategori.module').then( m => m.KategoriPageModule)
  },
  {
    path: 'orderan',
    loadChildren: () => import('./orderan/orderan.module').then( m => m.OrderanPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
