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

  keranjang: any = []
  user: any = this.pengguna.ambilPengguna();
  error: string = ""

  ngOnInit() {
    if(this.user != null){
      this.transaksi.lihatKeranjang(this.user.id).subscribe((data)=>{
        if(data.hasil != "err"){
          this.keranjang = data.data
          console.log(this.user.id);
        }
      });
    }
  }

  getTotal(): number {
    return this.keranjang.reduce((acc: number, barang: any) => acc + barang.harga * barang.jumlah, 0);
  }

  checkout() {
    if(this.user){
      this.transaksi.beli(this.user.id).subscribe((data)=>{
        if(data.hasil == "err"){
          this.error = data.data;
          return;
        }
        this.keranjang = []
        this.router.navigate(["/home"])
      })
    }
  }
}
