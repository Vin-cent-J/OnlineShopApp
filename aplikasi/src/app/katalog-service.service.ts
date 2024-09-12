import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KatalogServiceService {

  tambahBarang(p_nama: string, p_stok: number, p_harga: number, p_foto: string, p_mereks_id: number, p_kategoris_id: number){
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('nama', p_nama);
    body.set('stok', p_stok.toString());
    body.set('harga', p_harga.toString());
    body.set('foto', p_foto);
    body.set('mereks_id', p_mereks_id.toString());
    body.set('kategoris_id', p_kategoris_id.toString());
    const data = body.toString();
    return this.http.post(
      "127.0.0.1/API/tambahBarang.php", data, {headers}
    );
  }

  ubahData(p_nama: string, p_stok: number, p_harga: number, p_foto: string, p_mereks_id: number, p_kategoris_id: number, p_id: number){
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('nama', p_nama);
    body.set('stok', p_stok.toString());
    body.set('harga', p_harga.toString());
    body.set('foto', p_foto);
    body.set('mereks_id', p_mereks_id.toString());
    body.set('kategoris_id', p_kategoris_id.toString());
    body.set('id', p_id.toString());
    const data = body.toString();
    return this.http.post(
      "127.0.0.1/API/ubahDataBarang.php", data, {headers}
    );
  }

  hapusBarang(p_id: number){
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    const data = body.toString();
    return this.http.post(
      "127.0.0.1/API/hapusBarang.php", data, {headers}
    );
  }

  detailBarang(p_id: number){
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    const data = body.toString();
    return this.http.post(
      "127.0.0.1/API/detailBarang.php", data, {headers}
    );
  }

  constructor(private http: HttpClient) { }
}
