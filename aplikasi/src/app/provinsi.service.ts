import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinsiService {

  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl;

  getProvinsi(): Observable<any>{
    return this.http.get(this.baseUrl+"OnlineShopApp/API/data-indo/provinsi.json");
  }
  getKota(id: number): Observable<any>{
    return this.http.get(this.baseUrl+"OnlineShopApp/API/data-indo/kota/"+id+".json");
  }
}
