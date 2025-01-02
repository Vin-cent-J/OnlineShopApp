import { Component, OnInit } from '@angular/core';
import { KatalogServiceService } from '../katalog-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PenggunaService } from '../pengguna.service';
import { TransaksiService } from '../transaksi.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detailbarang',
  templateUrl: './detailbarang.page.html',
  styleUrls: ['./detailbarang.page.scss'],
})
export class DetailbarangPage implements OnInit {
  baseUrl = environment.apiUrl;

  constructor(private katalog: KatalogServiceService, private route: ActivatedRoute, private router: Router, private pengguna: PenggunaService, private transaksi: TransaksiService) { }

  barang: any = {}
  id: number = 0
  error = ""

  jumlah = 1
  user = this.pengguna.ambilPengguna()

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.katalog.detailBarang(this.id).subscribe((data)=>
        {
          if(data.hasil == "err"){
            this.error = data.data
            console.log(this.error)
            return
          }
          console.log(data)
          this.barang = data.data
        }
      )
    });
  }

  tambahKeranjang(idBarang: number){
    if(this.user === null || this.user.id <= 0){
      this.router.navigate(["/login"])
      return
    }
    this.transaksi.tambahKeranjang(this.user.id, idBarang, this.jumlah).subscribe((data)=>{
      console.log(data)
      if(data.hasil != "err"){
        this.router.navigate(["/katalog"])
      }
    })
  }

}
