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
  userId = localStorage.getItem('userId');
  error: string = ""

  ngOnInit() {
    if(this.userId){
      this.transaksi.lihatKeranjang(this.userId).subscribe((data)=>{
        if(data.hasil != "error"){
          this.keranjang = data.data
        }
      })
    }
  }

  getTotal(): number {
    return this.keranjang.reduce((acc: number, barang: any) => acc + barang.price * barang.quantity, 0);
  }

  checkout() {
    if(this.userId){
      this.transaksi.beli(this.userId).subscribe((data)=>{
        if(data.hasil == "err"){
          this.error = data.data
          return
        }
      })
    }
  }
}
