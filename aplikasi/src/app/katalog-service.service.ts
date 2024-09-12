import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KatalogServiceService {
  
  katalog(){
    return this.http.get("127.0.0.1/API/katalog.php");
  }

  cariBarang(p_cari: string | undefined | null, p_merek: number | undefined | null, p_kategori: number | undefined | null, p_min: number = 0, p_max: number = 100000000){
    let url = "127.0.0.1/API/katalog.php?minHarga=" + p_min +  " & maxHarga=" + p_max;
    if(p_cari != null){
      url = url + " & cari=" + p_cari;
    }
    if(p_merek != null){
      url = url + " & merek=" + p_merek; 
    }
    if(p_kategori != null){
      url = url + " & kategori=" + p_kategori;
    }
    return this.http.get(url);
  }

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
    body.set('id', p_id.toString());
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
