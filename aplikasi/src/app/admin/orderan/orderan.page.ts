import { Component, numberAttribute, OnInit } from '@angular/core';
import { TransaksiService } from 'src/app/transaksi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orderan',
  templateUrl: './orderan.page.html',
  styleUrls: ['./orderan.page.scss'],
})
export class OrderanPage implements OnInit {

  total=0;
  orders: any[] = [];
  orderDicari: any[] = [];
  filterOrder: any[] = [];
  cari = "";
  halaman = 1;
  isModalOpen = false;
  idOrder = 0;
  statusPilihan = ""
  status = "";
  statuss = "";
  pilihanStatus = [
    "Diproses",
    "Dibatalkan",
    "Sedang Diantar",
    "Sudah Sampai Tujuan"
  ];
  constructor(private transaksi: TransaksiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.order();
    this.route.params.subscribe((params)=>{
      if(params["halaman"] != null || params["halaman"] > 0){
        this.halaman = params["halaman"];
      }
    });
  }

  get range(): number[] {
    return Array.from({ length: this.total }, (_, i) => i + 1);
  }

  cariOrder() {
    this.filterOrder = this.orders.filter(order => order.nama.toLowerCase().includes(this.cari.toLowerCase()) || String(order.id).toLowerCase().includes(this.cari.toLowerCase()));
  }

  filterStatus(){
    this.orderDicari = this.orders.filter(order => order.nama.toLowerCase().includes(this.cari.toLowerCase()) || String(order.id).toLowerCase().includes(this.cari.toLowerCase()));
    this.filterOrder = this.orderDicari.filter(order => order.status.toLowerCase().includes(this.statusPilihan.toLowerCase()));
    console.log(this.filterOrder);
  }

  order(){
    this.transaksi.ambilOrder(this.halaman).subscribe(data=>{
      if(data.hasil != "err"){
        this.orders = data.data;
        this.filterOrder = data.data;
      }
    });
  }

  getTotal(detail: any): number {
    return detail.reduce((acc: number, barang: any) => acc + barang.harga * barang.jumlah, 0);
  }

  updateStatus(){
    this.transaksi.ubahStatus(this.idOrder, this.status).subscribe(data=>{
      if(data.hasil != "err"){
        this.order();
        this.isModalOpen = false;
      }
    });
  }

  bukaModal(order: any) {
    this.idOrder = order.id;
    this.status = order.status;
    this.statuss = order.status;
    this.isModalOpen = true;
  }

  tutupModal() {
    this.isModalOpen = false;
  }

}
