import { Component, OnInit } from '@angular/core';
import { KatalogServiceService } from '../katalog-service.service';
import { ChangeDetectorRef } from '@angular/core';
import { TransaksiService } from '../transaksi.service';
import { PenggunaService } from '../pengguna.service';
import { ActivatedRoute } from '@angular/router';

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

  halaman = 1;
  total = 1;

  cari: string = "";
  kategoriPilihan: any = null;
  merekPilihan: any = null;
  minHarga: any = null;
  maxHarga: any = null;

  constructor(private katalog: KatalogServiceService, private cdr: ChangeDetectorRef, private transaksi: TransaksiService, private pengguna: PenggunaService, private route: ActivatedRoute) { }

  user = this.pengguna.ambilPengguna();
  jumlah = 0;

  get range(): number[] {
    return Array.from({ length: this.total }, (_, i) => i + 1);
  }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      if(params["halaman"] != null || params["halaman"] > 0){
        this.halaman = params["halaman"];
      }
    })
    this.katalog.katalog(this.halaman).subscribe((data)=>{
      if (data.status != "err"){
        this.barangs = data.data;
        this.total = data.total;
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
    this.katalog.cariBarang(this.cari, this.merekPilihan, this.kategoriPilihan, this.minHarga, this.maxHarga, this.halaman).subscribe((data)=>{
      if(data.status != "err"){
        this.barangs = data.data
        this.cdr.detectChanges();
      }
    });
  }

  tambahKeranjang(idBarang: number){
    this.transaksi.tambahKeranjang(this.user.id, idBarang, this.jumlah).subscribe((data)=>{
      console.log(data)
    })
  }
}
