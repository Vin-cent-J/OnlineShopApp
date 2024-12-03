import { Component, OnInit } from '@angular/core';
import { TransaksiService } from '../transaksi.service';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
})
export class KeranjangPage implements OnInit {

  constructor(private transaksi: TransaksiService) { }

  keranjang: any = []
  user: any = localStorage.getItem('pengguna');
  error: string = ""

  ngOnInit() {
    if(this.user != null){
      this.user = JSON.parse(this.user);
      this.transaksi.lihatKeranjang(this.user.id).subscribe((data)=>{
        if(data.hasil != "err"){
          this.keranjang = data.data
        }
      });
    }
  }

  getTotal(): number {
    return this.keranjang.reduce((acc: number, barang: any) => acc + barang.price * barang.quantity, 0);
  }

  checkout() {
    if(this.user){
      this.transaksi.beli(this.user.id).subscribe((data)=>{
        if(data.hasil == "err"){
          this.error = data.data;
          return
        }
        this.keranjang = []
      })
    }
  }
}
