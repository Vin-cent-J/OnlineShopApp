import { Component, OnInit } from '@angular/core';
import { KatalogServiceService } from '../katalog-service.service';
import { ChangeDetectorRef } from '@angular/core';
import { TransaksiService } from '../transaksi.service';
import { PenggunaService } from '../pengguna.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.page.html',
  styleUrls: ['./katalog.page.scss'],
})
export class KatalogPage implements OnInit {

  baseUrl = environment.apiUrl;

  isFilter = false;

  barangs:any = [];
  kategori:any = [];
  merek:any = [];
  index = 0;

  halaman: number = 1;
  total = 1;

  cari: string = "";
  kategoriPilihan: any = null;
  merekPilihan: any = null;
  minHarga: any = null;
  maxHarga: any = null;

  constructor(private katalog: KatalogServiceService, private cdr: ChangeDetectorRef, private transaksi: TransaksiService, private pengguna: PenggunaService, private route: ActivatedRoute, private router: Router) { }

  user = this.pengguna.ambilPengguna();
  jumlah = 0;

  get range(): number[] {
    return Array.from({ length: this.total }, (_, i) => i + 1);
  }

  bukaFilter(){
    console.log("AAAA")
    if(!this.isFilter){
      this.isFilter=true;
    } else {
      this.isFilter=false;
    }
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.cari = params["q"];
      this.filter();
    });
    this.route.params.subscribe((params)=>{
      if(params["halaman"] != null || params["halaman"] > 0){
        this.halaman = params["halaman"];
      }
    });
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

  cariBarang(event: any) {
    if (event.key === 'Enter') {
      this.router.navigate(['/katalog/'], { queryParams: { q: this.cari } });
    }
  }

  filter() {
    this.katalog.cariBarang(this.cari, this.merekPilihan, this.kategoriPilihan, this.minHarga, this.maxHarga, this.halaman).subscribe((data)=>{
      console.log(data);
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