import { Component, OnInit } from '@angular/core';
import { KatalogServiceService } from '../katalog-service.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.page.html',
  styleUrls: ['./katalog.page.scss'],
})
export class KatalogPage implements OnInit {

  barangs:any = [];
  kategori:any = [];
  merek:any = [];
  index = 0;

  cari: string = ""
  kategoriPilihan: any = null
  merekPilihan: any = null
  minHarga: any = null
  maxHarga: any = null

  constructor(private katalog: KatalogServiceService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.katalog.katalog().subscribe((data)=>{
      if (data.status != "err"){
        this.barangs = data.data;
      }
    });
    this.katalog.ambilKategori().subscribe((data)=>{
      if (data.status != "err"){
        this.kategori = data.data;
      }
    });
    this.katalog.ambilMerek().subscribe((data)=>{
      if (data.status != "err"){
        this.merek = data.data;
      }
    });
  }

  filter() {
    console.log([this.cari, this.merekPilihan, this.kategoriPilihan, this.minHarga, this.maxHarga])
    this.katalog.cariBarang(this.cari, this.merekPilihan, this.kategoriPilihan, this.minHarga, this.maxHarga).subscribe((data)=>{
      if(data.status != "err"){
        this.barangs = data.data
        this.cdr.detectChanges();
      }
    });
  }
}
