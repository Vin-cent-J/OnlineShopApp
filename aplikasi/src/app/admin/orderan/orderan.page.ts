import { Component, numberAttribute, OnInit } from '@angular/core';
import { TransaksiService } from 'src/app/transaksi.service';
@Component({
  selector: 'app-orderan',
  templateUrl: './orderan.page.html',
  styleUrls: ['./orderan.page.scss'],
})
export class OrderanPage implements OnInit {

  orders: any[] = [];
  isModalOpen = false;
  idOrder = 0;
  status = "";
  pilihanStatus = [
    "Diproses",
    "Sedang Diantar",
    "Sudah Sampai Tujuan"
  ];
  constructor(private transaksi: TransaksiService) { }

  ngOnInit() {
    this.order();
  }

  order(){
    this.transaksi.ambilOrder().subscribe(data=>{
      if(data.hasil != "err"){
        this.orders = data.data;
      }
    });
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
    this.status = order.status
    this.isModalOpen = true;
  }

  tutupModal() {
    this.isModalOpen = false;
  }

}
