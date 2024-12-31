import { Injectable, Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  baseUrl = environment.apiUrl;

  previewFoto: string | undefined;
  loading = false;
  progresUpload = 0;

  constructor(private http: HttpClient) { }

  dataURLToBlob(dataURL: string): Blob {
    const parts = dataURL.split(';base64,');
    const tipe = parts[0].split(':')[1];
    const byteCharacters = atob(parts[1]);
    const byteArrays: Uint8Array[] = [];

    const sliceSize = 512;
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: tipe });
  }

  uploadFoto(foto: Blob, nama: string){
    const headers = new HttpHeaders({})
    const formData = new FormData();
    const fileName = `${nama}.jpg`;
    formData.append('file', foto, fileName);
    formData.append('nama', nama)
    this.http.post(this.baseUrl+'OnlineShopApp/API/upload.php', formData, {headers}).subscribe(data => {
      console.log(data);
    });
  }
}
