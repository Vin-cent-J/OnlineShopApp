import { Component, OnInit } from '@angular/core';
import { KatalogServiceService } from 'src/app/katalog-service.service';
import { ActivatedRoute, Route } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { FotoService } from 'src/app/foto.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-barang',
  templateUrl: './barang.page.html',
  styleUrls: ['./barang.page.scss'],
})
export class BarangPage implements OnInit {

  baseUrl = environment.apiUrl;

  barangs: any[] = [];
  kategori: any[] = [];
  merek: any[] = [];
  isModalOpen = false;
  isEditMode = false;
  idBarang : number = 0

  nama = '';
  namaFile = '';
  harga = 0;
  stok = 0;
  foto : string = "";
  blob : Blob | null = null;
  total = 0;

  kategoriPilihan = 1;
  namaKategori = "Pilih Kategori";
  namaMerek = "Pilih Merek";
  merekPilihan = 1;

  halaman = 1;

  get range(): number[] {
    return Array.from({ length: this.total }, (_, i) => i + 1);
  }

  constructor(private katalog: KatalogServiceService, private route: ActivatedRoute, private fotos: FotoService) { }

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
        this.kategori = data.data;
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
        this.merek = data.data;
      }
    })
  }

  bukaModalTambah() {
    this.isEditMode = false;
    this.idBarang = 0;
    this.nama = '';
    this.harga = 0;
    this.stok = 0;
    this.foto = "";
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
      this.katalog.ubahDataBarang(this.nama, this.stok, this.harga, this.namaFile+".jpg", this.merekPilihan, this.kategoriPilihan, this.idBarang).subscribe(data => {
        if(data.hasil === "success"){
          this.isModalOpen = false;
          this.Barang();
        }
      });
    } else {
      this.katalog.tambahBarang(this.nama, this.stok, this.harga, this.namaFile+".jpg", this.merekPilihan, this.kategoriPilihan,).subscribe(data => {
        if(data.hasil === "success"){
          this.isModalOpen = false;
          this.Barang();
        }
      })
    }
  }

  previewFoto: string | null = null;

  async ambilFoto(source: 'camera' | 'gallery'): Promise<void> {
    try {
      const image: Photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: source === 'camera' ? CameraSource.Camera : CameraSource.Photos
      });

      if (image && image.dataUrl) {
        this.previewFoto = image.dataUrl;
        const blob = this.fotos.dataURLToBlob(image.dataUrl);
        this.namaFile = this.nama + "_" + Date.now();

        this.fotos.uploadFoto(blob, this.namaFile);
      } else {
        console.warn('Tidak ada foto');
        return 
      }
    } catch (error) {
      console.error('Error saat mengammbil foto', error);
    }
  }
}
