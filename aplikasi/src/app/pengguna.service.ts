import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PenggunaService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(p_no_hp: string, p_pass: string): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('nomor_hp', p_no_hp);
    body.set('password', p_pass)
    const data = body.toString();
    return this.http.post(this.baseUrl+"OnlineShopApp/API/login.php", data, {headers});
  }

  register(p_id: string,p_no_hp: string, p_pass: string, p_nama: string, p_alamat: string): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set("id", p_id);
    body.set('nomor_hp', p_no_hp);
    body.set('password', p_pass)
    body.set('nama', p_nama);
    body.set('alamat', p_alamat);
    const data = body.toString();
    return this.http.post(this.baseUrl+"OnlineShopApp/API/register.php", data, {headers});
  }

  ubahData(p_pid: string, p_no_hp: string, p_nama: string, p_pass: string, p_passBaru: string): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('id', p_pid);
    body.set('no_hp', p_no_hp);
    body.set('password', p_pass)
    body.set('nama', p_nama);
    if(p_passBaru.trim() !== ""){
      body.set('passwordBaru', p_passBaru);
    }
    const data = body.toString();
    return this.http.post(this.baseUrl+"OnlineShopApp/API/ubahDataPengguna.php", data, {headers});
  }

  ambilProfil(p_id: string): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('id', p_id);
    const data = body.toString();
    return this.http.post(this.baseUrl+"OnlineShopApp/API/ambilProfil.php", data, {headers});
  }

  ambilAlamat(p_pid: string): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('penggunas_id', p_pid);
    const data = body.toString();
    return this.http.post(this.baseUrl+"OnlineShopApp/API/ambilAlamat.php", data, {headers});
  }

  simpanPengguna(user: any) {
    localStorage.setItem('pengguna', JSON.stringify(user));
  }

  ambilPengguna() {
    const user = localStorage.getItem('pengguna');
    return user ? JSON.parse(user) : null;
  }

  tambahAlamat(p_pid: string, alamat: string){
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('penggunas_id', p_pid);
    body.set('alamat', alamat);
    const data = body.toString();
    return this.http.post(this.baseUrl+"OnlineShopApp/API/tambahAlamat.php", data, {headers});
  }

  ubahAlamat(id: string, alamat: string, utama: boolean){
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('id', id);
    body.set('alamat', alamat);
    let nilai = utama ? 1 : 0; 
    body.set('utama', nilai.toString());
    const data = body.toString();
    return this.http.post(this.baseUrl+"OnlineShopApp/API/ubahAlamat.php", data, {headers});
  }

  logout() {
    localStorage.removeItem('pengguna');
  }

}
