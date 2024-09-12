import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PenggunaService {

  constructor(private http: HttpClient) { }

  login(p_no_hp: string, p_pass: string): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('nomor_hp', p_no_hp);
    body.set('password', p_pass)
    const data = body.toString();
    return this.http.post("127.0.0.1/API/login.php", data, {headers});
  }

  register(p_no_hp: string, p_pass: string, p_nama: string, p_alamat: string){
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('nomor_hp', p_no_hp);
    body.set('password', p_pass)
    body.set('nama', p_nama);
    body.set('alamat', p_alamat);
    const data = body.toString();
    return this.http.post("register.php", data, {headers});
  }

  ubahData(p_no_hp: string, p_nama: string, p_alamat: string, p_pass: string){
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('nomor_hp', p_no_hp);
    body.set('password', p_pass)
    body.set('nama', p_nama);
    body.set('alamat', p_alamat);
    const data = body.toString();
    return this.http.post("register.php", data, {headers});
  }

}
