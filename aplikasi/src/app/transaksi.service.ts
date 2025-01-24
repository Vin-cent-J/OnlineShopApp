import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransaksiService {

  baseUrl = environment.apiUrl

  beli(p_pid: string, p_alamat: string):Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set("penggunas_id", p_pid);
    body.set("alamat", p_alamat);
    const data = body.toString();
    return this.http.post(
      this.baseUrl+"OnlineShopApp/API/beli.php", data, {headers}
    );
  }

  lihatKeranjang(p_pid: string): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('penggunas_id', p_pid);
    const data = body.toString();
    return this.http.post(
      this.baseUrl+"OnlineShopApp/API/keranjang.php", data, {headers}
    );
  }

  riwayat(p_pid: number): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('penggunas_id', p_pid.toString());
    const data = body.toString();
    return this.http.post(
      this.baseUrl+"OnlineShopApp/API/riwayat.php", data, {headers}
    );
  }

  tambahKeranjang(p_pid: number, p_bid: number, p_jumlah: number):Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('penggunas_id', p_pid.toString());
    body.set('barangs_id', p_bid.toString());
    body.set('jumlah', p_jumlah.toString());
    const data = body.toString();
    return this.http.post(
      this.baseUrl+"OnlineShopApp/API/tambahKeranjang.php", data, {headers}
    );
  }

  ubahKeranjang(p_pid: number, p_bid: number, p_jumlah: number):Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('penggunas_id', p_pid.toString());
    body.set('barangs_id', p_bid.toString());
    body.set('jumlah', p_jumlah.toString());
    const data = body.toString();
    return this.http.post(
      this.baseUrl+"OnlineShopApp/API/ubahKeranjang.php", data, {headers}
    );
  }

  hapusKeranjang(p_pid: number, p_bid: number):Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('penggunas_id', p_pid.toString());
    body.set('barangs_id', p_bid.toString());
    const data = body.toString();
    return this.http.post(
      this.baseUrl+"OnlineShopApp/API/hapusKeranjang.php", data, {headers}
    );
  }

  ambilOrder(halaman: number | null):Observable<any>{
    if(halaman === null){
      halaman = 1;
    }
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.get(
      this.baseUrl+"OnlineShopApp/API/ambilOrder.php", {headers}
    );
  }

  ubahStatus(p_oid: number, p_status: string):Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('id', p_oid.toString());
    body.set('status', p_status);
    const data = body.toString();
    return this.http.post(
      this.baseUrl+"OnlineShopApp/API/ubahStatus.php", data, {headers}
    );
  }

  constructor(private http: HttpClient) { }
}
