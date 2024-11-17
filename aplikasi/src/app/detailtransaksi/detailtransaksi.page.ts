import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransaksiService } from '../transaksi.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-detailtransaksi',
  templateUrl: './detailtransaksi.page.html',
  styleUrls: ['./detailtransaksi.page.scss'],
})
export class DetailtransaksiPage implements OnInit {

  id = 0
  jumlah = 0
  detail:any = { id: '123456789', total: 99.99, tanggal: 'November 3, 2024', status: 'Terkirim' }
  barangs:any=[]
  
  constructor(private route: ActivatedRoute, private transaksi: TransaksiService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.transaksi.riwayat(this.id).subscribe(
        (data)=>{
          this.detail = data
        }
      )
    });
  }  

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
