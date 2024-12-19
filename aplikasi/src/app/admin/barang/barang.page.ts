import { Component, OnInit } from '@angular/core';
import { KatalogServiceService } from 'src/app/katalog-service.service';
import { ActivatedRoute, Route } from '@angular/router';
@Component({
  selector: 'app-barang',
  templateUrl: './barang.page.html',
  styleUrls: ['./barang.page.scss'],
})
export class BarangPage implements OnInit {

  barangs: any[] = [];
  kategori: any[] = [];
  merek: any[] = [];
  isModalOpen = false;
  isEditMode = false;
  idBarang : number = 0

  nama = '';
  harga = 0;
  stok = 0;
  foto = '';
  total = 0;

  kategoriPilihan = 1;
  namaKategori = "Pilih Kategori";
  namaMerek = "Pilih Merek";
  merekPilihan = 1;

  halaman = 1;

  get range(): number[] {
    return Array.from({ length: this.total }, (_, i) => i + 1);
  }

  constructor(private katalog: KatalogServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      if(params["halaman"] != null || params["halaman"] > 0){
        this.halaman = params["halaman"];
      }
    })

    this.Kategori();
    this.Merek();
    this.Barang();
  }

  private Kategori(){
    this.katalog.ambilKategori().subscribe(data=>{
      if(data.hasil === "success"){
        this.kategori = data.data
      }
    })
  }

  private Barang(){
    this.katalog.katalog(this.halaman).subscribe(data=>{
      if(data.hasil === "success"){
        this.barangs = data.data
        this.total = data.total;
      }
    })
  }

  private Merek(){
    this.katalog.ambilMerek().subscribe(data => {
      if(data.hasil === "success"){
        this.merek = data.data
      }
    })
  }

  bukaModalTambah() {
    this.isEditMode = false;
    this.idBarang = 0;
    this.nama = '';
    this.harga = 0;
    this.stok = 0;
    this.foto = '';
    this.merekPilihan = 1;
    this.kategoriPilihan = 1;
    this.namaKategori = "";
    this.namaMerek = "";
    this.isModalOpen = true;
  }

  bukaModalEdit(barang: any) {
    this.isEditMode = true;
    this.idBarang = barang.id || 0;
    this.nama = barang.nama;
    this.harga = barang.harga;
    this.stok = barang.stok;
    this.foto = barang.foto;
    this.merekPilihan = barang.mereks_id;
    this.kategoriPilihan = barang.kategoris_id;
    this.namaKategori = barang.kategori;
    this.namaMerek = barang.merek;
    this.isModalOpen = true;
  }

  tutupModal() {
    this.isModalOpen = false;
  }

  hapusBarang(id: number){
    this.katalog.hapusBarang(id).subscribe(data => {
      if(data.hasil === "success"){
        this.isModalOpen = false;
        this.Barang();
      }
    });
  } 

  simpanBarang(){
    if(this.isEditMode){
      this.katalog.ubahDataBarang(this.nama, this.stok, this.harga, this.foto, this.merekPilihan, this.kategoriPilihan, this.idBarang).subscribe(data => {
        if(data.hasil === "success"){
          this.isModalOpen = false;
          this.Barang();
        }
      });
    } else {
      this.katalog.tambahBarang(this.nama, this.stok, this.harga, this.foto, this.merekPilihan, this.kategoriPilihan,).subscribe(data => {
        if(data.hasil === "success"){
          this.isModalOpen = false;
          this.Barang();
        }
      })
    }
  }

}
