import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
})
export class TransaksiPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  transaksi = [
    { id: '123456789', total: 99.99, date: 'November 3, 2024', status: 'Terkirim' },
    { id: '987654321', total: 49.99, date: 'November 1, 2024', status: 'Menunggu pengiriman' },
    { id: '456789123', total: 199.99, date: 'October 30, 2024', status: 'Bayar' },
    { id: '456789122', total: 199.99, date: 'October 30, 2024', status: 'Batal' },
  ];

  warnaStatus(status: string) {
    switch (status) {
      case 'Terkirim':
        return 'success';
      case 'Menunggu pengiriman':
        return 'warning';
      case 'Bayar':
        return 'warning';
      case 'Batal':
        return 'danger';
      default:
        return 'medium';
    }
  }
}
