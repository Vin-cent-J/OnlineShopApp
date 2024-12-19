import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KatalogServiceService {
  
  katalog(halaman: number): Observable<any>{
    return this.http.get("http://localhost/OnlineShopApp/API/katalog.php?halaman=" + halaman);
  }

  cariBarang(p_cari: string | undefined | null, p_merek: number | undefined | null, p_kategori: number | undefined | null, p_min: number, p_max: number, halaman: number): Observable<any>{
    if(!p_min){
      p_min = 0
    }
    if(!p_max){
      p_max = 100000000
    }
    let url = "http://localhost/OnlineShopApp/API/katalog.php?halaman=" + halaman + "&minHarga=" + p_min +  "&maxHarga=" + p_max;
    if (p_cari) {
      url += `&cari=${p_cari}`;
    }
    if (p_merek) {
      url += `&merek=${p_merek}`;
    }
    if (p_kategori) {
      url += `&kategori=${p_kategori}`;
    }
    console.log(url);
    return this.http.get(url);
  }

  tambahBarang(p_nama: string, p_stok: number, p_harga: number, p_foto: string, p_mereks_id: number, p_kategoris_id: number):Observable<any>{
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
      "http://localhost/OnlineShopApp/API/tambahBarang.php", data, {headers}
    );
  }

  ubahDataBarang(p_nama: string, p_stok: number, p_harga: number, p_foto: string, p_mereks_id: number, p_kategoris_id: number, p_id: number):Observable<any>{
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
      "http://localhost/OnlineShopApp/API/ubahDataBarang.php", data, {headers}
    );
  }

  hapusBarang(p_id: number):Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('id', p_id.toString());
    const data = body.toString();
    return this.http.post(
      "http://localhost/OnlineShopApp/API/hapusBarang.php", data, {headers}
    );
  }

  detailBarang(p_id: number): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('id', p_id.toString());
    const data = body.toString();
    return this.http.post(
      "http://localhost/OnlineShopApp/API/detailBarang.php", data, {headers}
    );
  }

  ambilMerek(): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.post(
      "http://localhost/OnlineShopApp/API/ambilMerek.php", null, {headers}
    );
  }

  hapusMerek(p_id: number): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('id', p_id.toString());
    const data = body.toString();
    return this.http.post(
      "http://localhost/OnlineShopApp/API/hapusMerek.php", data, {headers}
    );
  }

  ubahMerek(p_id: number, p_nama: string): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('id', p_id.toString());
    body.set('nama', p_nama);
    const data = body.toString();
    return this.http.post(
      "http://localhost/OnlineShopApp/API/ubahMerek.php", data, {headers}
    );
  }

  tambahMerek(p_nama: string): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('nama', p_nama);
    const data = body.toString();
    return this.http.post(
      "http://localhost/OnlineShopApp/API/tambahMerek.php", data, {headers}
    );
  }

  ambilKategori(): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.post(
      "http://localhost/OnlineShopApp/API/ambilKategori.php", null, {headers}
    );
  }

  ubahKategori(p_id: number, p_nama: string): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('id', p_id.toString());
    body.set('nama', p_nama);
    const data = body.toString();
    return this.http.post(
      "http://localhost/OnlineShopApp/API/ubahKategori.php", data, {headers}
    );
  }
  
  hapusKategori(p_id: number): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('id', p_id.toString());
    const data = body.toString();
    return this.http.post(
      "http://localhost/OnlineShopApp/API/hapusKategori.php", data, {headers}
    );
  }

  tambahKategori(p_nama: string): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('nama', p_nama);
    const data = body.toString();
    return this.http.post(
      "http://localhost/OnlineShopApp/API/tambahKategori.php", data, {headers}
    );
  }

  constructor(private http: HttpClient) { }
}
