import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { FotoService } from 'src/app/foto.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.page.html',
  styleUrls: ['./banner.page.scss'],
})
export class BannerPage implements OnInit {

  constructor(private fotos: FotoService) {}

  ngOnInit() {
    
  }

  baseUrl = environment.apiUrl;

  async ambilFoto(id: number): Promise<void> {
    try {
      const image: Photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl
      });

      if (image && image.dataUrl) {
        const blob = this.fotos.dataURLToBlob(image.dataUrl);
        const namaFile = "Banner_" + id;

        this.fotos.uploadFoto(blob, namaFile);
      } else {
        console.warn('Tidak ada foto');
        return 
      }
    } catch (error) {
      console.error('Error saat mengammbil foto', error);
    }
  }

}
