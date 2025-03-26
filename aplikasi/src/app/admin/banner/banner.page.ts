import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { timestamp } from 'rxjs';
import { FotoService } from 'src/app/foto.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.page.html',
  styleUrls: ['./banner.page.scss'],
})
export class BannerPage implements OnInit {

  constructor(private fotos: FotoService) {}

  banners:any[] = []
  isEditMode = false;
  isModalOpen = false;
  id = 0;
  nama = "";
  namaFoto = "";
  previewFoto: string | null = null;
  foto : string = "";

  ngOnInit() {
    this.banner();
  }

  banner(){
    this.fotos.ambilBanner().subscribe(data=>{
      if(data.hasil=="success"){
        this.banners = data.data;
      }
    });
  }

  baseUrl = environment.apiUrl;

  async ambilFoto(): Promise<void> {
    try {
      const image: Photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl
      });

      if (image && image.dataUrl) {
        this.previewFoto = image.dataUrl;
        const blob = this.fotos.dataURLToBlob(image.dataUrl);
        const namaFile = "Banner_" + Date.now();

        this.fotos.uploadFoto(blob, namaFile, true);
        this.namaFoto = namaFile+'.jpg';
      } else {
        console.warn('Tidak ada foto');
      }
    } catch (error) {
      console.error('Error saat mengambil foto', error);
    }
  }

  bukaModalTambah(){
    this.isEditMode = false;
    this.isModalOpen = true;

    this.nama = '';
    this.foto = '';
  }

  fotoSekarang = "";
  bukaModalEdit(banner: any){
    this.isEditMode = true;
    this.isModalOpen = true;

    this.nama = banner.nama;
    this.id = banner.id;
    this.foto = banner.foto;
    this.fotoSekarang = banner.foto;
  }

  tutupModal(){
    this.isModalOpen = false;
  }

  hapusBanner(id: number){
    this.fotos.hapusBanner(id).subscribe(data=>{
      if(data.hasil == 'success'){
        this.banner();
      }
    });
  }

  simpanBanner(){
    if(!this.isEditMode){
      this.fotos.tambahBanner(this.nama, this.namaFoto).subscribe(data=>{
        if(data.hasil === 'success'){
          this.banner();
        }
      });
    }
    else{
      this.fotos.ubahBanner(this.id, this.nama, this.namaFoto, this.fotoSekarang).subscribe(data=>{
        console.log(data);
        if(data.hasil === 'success'){
          this.banner();
        }
      });
    }
    this.tutupModal();
  }
}
