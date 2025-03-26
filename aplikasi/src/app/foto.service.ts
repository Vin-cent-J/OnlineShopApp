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

  uploadFoto(foto: Blob, nama: string, banner: boolean = false){
    const headers = new HttpHeaders({})
    const formData = new FormData();
    const fileName = `${nama}.jpg`;
    formData.append('file', foto, fileName);
    formData.append('nama', nama)
    formData.append('isBanner', banner ? '1' : '');
    this.http.post(this.baseUrl+'OnlineShopApp/API/upload.php', formData, {headers}).subscribe(data => {
      console.log(data);
    });
  }

  ambilBanner(): Observable<any>{
    return this.http.get(this.baseUrl+'OnlineShopApp/API/banner.php');
  }

  tambahBanner(nama: string, foto: string): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('nama', nama);
    body.set('foto', foto);
    const data = body.toString();
    return this.http.post(
      this.baseUrl+"OnlineShopApp/API/tambahBanner.php", data, {headers}
    );
  }

  hapusBanner(id: number): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('id', id.toString());
    const data = body.toString();
    return this.http.post(
      this.baseUrl+"OnlineShopApp/API/hapusBanner.php", data, {headers}
    );
  }

  ubahBanner(id: number, nama: string, foto: string, fotoSekarang: string): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('id', id.toString());
    body.set('nama', nama);
    body.set('foto', foto);
    body.set('fotoSekarang', fotoSekarang);
    const data = body.toString();
    return this.http.post(
      this.baseUrl+"OnlineShopApp/API/ubahBanner.php", data, {headers}
    );
  }
}
