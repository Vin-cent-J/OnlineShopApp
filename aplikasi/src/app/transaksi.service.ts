import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaksiService {

  beli(p_pid: string){
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('penggunas_id', p_pid);
    const data = body.toString();
    return this.http.post(
      "http://localhost/OnlineShopApp/API/beli.php", data, {headers}
    );
  }

  lihatKeranjang(p_pid: string): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('penggunas_id', p_pid);
    const data = body.toString();
    return this.http.post(
      "http://localhost/OnlineShopApp/API/keranjang.php", data, {headers}
    );
  }

  riwayat(p_pid: number): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('penggunas_id', p_pid.toString());
    const data = body.toString();
    return this.http.post(
      "http://localhost/OnlineShopApp/API/riwayat.php", data, {headers}
    );
  }

  tambahKeranjang(p_pid: number, p_bid: number, p_jumlah: number){
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('penggunas_id', p_pid.toString());
    body.set('barangs_id', p_bid.toString());
    body.set('jumlah', p_jumlah.toString());
    const data = body.toString();
    return this.http.post(
      "http://localhost/OnlineShopApp/API/tambahKeranjang.php", data, {headers}
    );
  }

  ubahKeranjang(p_pid: number, p_bid: number, p_jumlah: number){
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('penggunas_id', p_pid.toString());
    body.set('barangs_id', p_bid.toString());
    body.set('jumlah', p_jumlah.toString());
    const data = body.toString();
    return this.http.post(
      "http://localhost/OnlineShopApp/API/ubahKeranjang.php", data, {headers}
    );
  }

  hapusKeranjang(p_pid: number, p_bid: number){
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('penggunas_id', p_pid.toString());
    body.set('barangs_id', p_bid.toString());
    const data = body.toString();
    return this.http.post(
      "http://localhost/OnlineShopApp/API/hapusKeranjang.php", data, {headers}
    );
  }

  constructor(private http: HttpClient) { }
}
