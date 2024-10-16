import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransaksiService {

  beli(p_pid: number){
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('penggunas_id', p_pid.toString());
    const data = body.toString();
    return this.http.post(
      "127.0.0.1/API/beli.php", data, {headers}
    );
  }

  riwayat(p_pid: number){
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('penggunas_id', p_pid.toString());
    const data = body.toString();
    return this.http.post(
      "127.0.0.1/API/riwayat.php", data, {headers}
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
      "127.0.0.1/API/tambahKeranjang.php", data, {headers}
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
      "127.0.0.1/API/ubahKeranjang.php", data, {headers}
    );
  }

  hapusKeranjang(p_pid: number, p_bid: number){
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('penggunas_id', p_pid.toString());
    body.set('barangs_id', p_bid.toString());
    const data = body.toString();
    return this.http.post(
      "127.0.0.1/API/hapusKeranjang.php", data, {headers}
    );
  }

  constructor(private http: HttpClient) { }
}
