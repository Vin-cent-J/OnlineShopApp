import { Component, OnInit } from '@angular/core';
import { KatalogServiceService } from 'src/app/katalog-service.service';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.page.html',
  styleUrls: ['./kategori.page.scss'],
})
export class KategoriPage implements OnInit {

  kategoris: any[] = [];
  filterKategori: any[] = [];
  cari = "";
  kategori: any
  isModalOpen = false;
  isEditMode = false;
  idKategori : number = 0
  nama = '';

  constructor(private katalog: KatalogServiceService ) { 
  }

  ngOnInit() {
    this.Kategori();
  }

  private Kategori(){
    this.katalog.ambilKategori().subscribe(data=>{
      if(data.hasil === "success"){
        this.kategoris = data.data;
        this.filterKategori = data.data;
      }
    })
  }

  bukaModalTambah() {
    this.isEditMode = false;
    this.idKategori = 0;
    this.nama = '';
    this.isModalOpen = true;
  }

  bukaModalEdit(kategori: any) {
    this.isEditMode = true;
    this.idKategori = kategori.id || 0;
    this.nama = kategori.nama;
    this.isModalOpen = true;
  }

  tutupModal() {
    this.isModalOpen = false;
  }

  hapusKategori(id: number){
    this.katalog.hapusKategori(id).subscribe(data => {
      if(data.hasil === "success"){
        this.isModalOpen = false;
        this.Kategori();
      }
    });
  }

  cariKategori() {
    this.filterKategori = this.kategoris.filter(merek => merek.nama.toLowerCase().includes(this.cari.toLowerCase()));
  }

  simpanKategori(){
    if(this.isEditMode){
      this.katalog.ubahKategori(this.idKategori, this.nama).subscribe(data => {
        if(data.hasil === "success"){
          this.isModalOpen = false;
          this.Kategori();
        }
      });
    } else {
      this.katalog.tambahKategori(this.nama).subscribe(data => {
        if(data.hasil === "success"){
          this.isModalOpen = false;
          this.Kategori();
        }
      })
    }
  }

}
