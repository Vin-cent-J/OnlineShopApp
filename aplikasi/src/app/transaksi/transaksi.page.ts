import { Component, OnInit } from '@angular/core';
import { TransaksiService } from '../transaksi.service';
import { PenggunaService } from '../pengguna.service';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
})
export class TransaksiPage implements OnInit {

  constructor(private transaksi: TransaksiService, private pengguna: PenggunaService) { }

  user: any = null
  transaksis = [
    { id: '123456789', total: 99.99, date: 'November 3, 2024', status: 'Terkirim' },
    { id: '987654321', total: 49.99, date: 'November 1, 2024', status: 'Menunggu pengiriman' },
    { id: '456789123', total: 199.99, date: 'October 30, 2024', status: 'Menunggu pembayaran' },
    { id: '456789122', total: 199.99, date: 'October 30, 2024', status: 'Batal' },
  ];
  error: string = ""

  ngOnInit() {
    this.user = this.pengguna.ambilPengguna()
    if(this.user.id){
      this.transaksi.riwayat(this.user.id).subscribe((data)=>{
        console.log(data);
        if(data.hasil=="err"){
          this.error = data.data;
          return;
        }
        this.transaksis = data.data;
      })
    }
    
  }

  warnaStatus(status: string) {
    switch (status) {
      case 'Terkirim':
        return 'success';
      case 'Menunggu pengiriman':
        return 'warning';
      case 'Menunggu pembayaran':
        return 'warning';
      case 'Batal':
        return 'danger';
      default:
        return 'medium';
    }
  }

  icon(status: string) {
    switch (status) {
      case 'Terkirim':
        return 'checkmark-circle';
      case 'Batal':
        return 'close-circle';
      case 'Bayar':
        return 'time';
      default:
        return 'help-circle';
    }
  }
}
