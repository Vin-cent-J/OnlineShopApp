import { Component, OnInit } from '@angular/core';
import { TransaksiService } from '../transaksi.service';
import { environment } from 'src/environments/environment';
import { PenggunaService } from '../pengguna.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
})
export class KeranjangPage implements OnInit {
  baseUrl = environment.apiUrl;

  constructor(private transaksi: TransaksiService, private pengguna: PenggunaService, private router: Router) { }

  keranjang: any[] = []
  user: any = this.pengguna.ambilPengguna();
  error: string = ""

  alamats: any[]= [];
  alamat : any = null;
  total = 0;

  isModalOpen = false;

  ngOnInit() {
    if(this.user != null){
      this.getKeranjang();
      this.pengguna.ambilAlamat(this.user.id).subscribe(data=>{
        if(data.hasil !== "err"){
          this.alamats = data.data;
          if (this.alamats.length > 0) {
            this.alamat = this.alamats[0].alamat;
          }
        }
      });
    }
  }

  getKeranjang(){
    this.transaksi.lihatKeranjang(this.user.id).subscribe((data)=>{
      if(data.hasil != "err"){
        this.keranjang = data.data;
      }
    });
  }

  getTotal(): number {
    return this.keranjang.reduce((acc: number, barang: any) => acc + barang.harga * barang.jumlah, 0);
  }

  checkout() {
    if(this.user){
      this.transaksi.beli(this.user.id, this.alamat).subscribe((data)=>{
        if(data.hasil == "err"){
          this.error = data.data;
          return;
        }
        this.total = this.getTotal();
        this.isModalOpen = true;
      })
    }
  }

  hapusBarang(bid: number){
    this.transaksi.hapusKeranjang(this.user.id, bid).subscribe(data=>{
      if(data.hasil !== "err"){
        this.getKeranjang();
      }
    });
  }

  tutupModal(){
    this.keranjang = [];
    this.isModalOpen = false;
  }
}
