import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { PenggunaService } from '../pengguna.service';

register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private pengguna: PenggunaService) {}
  
  user: any = {id:0, nama:""}

  ngOnInit(){
    this.user = this.pengguna.ambilPengguna()
  }

  logout(){
    this.pengguna.logout()
  }
  
}
