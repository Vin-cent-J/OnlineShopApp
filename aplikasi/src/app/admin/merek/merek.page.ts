import { Component, OnInit } from '@angular/core';
import { KatalogServiceService } from 'src/app/katalog-service.service';

@Component({
  selector: 'app-merek',
  templateUrl: './merek.page.html',
  styleUrls: ['./merek.page.scss'],
})
export class MerekPage implements OnInit {

  mereks: any[] = [];
  filterMerek: any[] = [];
  cari = "";
  isModalOpen = false;
  isEditMode = false;
  idMerek : number = 0
  nama = '';

  constructor(private katalog: KatalogServiceService ) { 
  }

  ngOnInit() {
    this.Merek();
  }

  private Merek(){
    this.katalog.ambilMerek().subscribe(data=>{
      if(data.hasil === "success"){
        this.mereks = data.data;
        this.filterMerek = data.data;
      }
    })
  }

  cariMerek() {
    this.filterMerek = this.mereks.filter(merek => merek.nama.toLowerCase().includes(this.cari.toLowerCase()));
  }

  bukaModalTambah() {
    this.isEditMode = false;
    this.idMerek = 0;
    this.nama = '';
    this.isModalOpen = true;
  }

  bukaModalEdit(merek: any) {
    this.isEditMode = true;
    this.idMerek = merek.id || 0;
    this.nama = merek.nama;
    this.isModalOpen = true;
  }

  tutupModal() {
    this.isModalOpen = false;
  }

  hapusMerek(id: number){
    this.katalog.hapusMerek(id).subscribe(data => {
      if(data.hasil === "success"){
        this.isModalOpen = false;
        this.Merek();
      }
    });
  } 

  simpanMerek(){
    if(this.isEditMode){
      this.katalog.ubahMerek(this.idMerek, this.nama).subscribe(data => {
        if(data.hasil === "success"){
          this.isModalOpen = false;
          this.Merek();
        }
      });
    } else {
      this.katalog.tambahMerek(this.nama).subscribe(data => {
        if(data.hasil === "success"){
          this.isModalOpen = false;
          this.Merek();
        }
      })
    }
  }

}
