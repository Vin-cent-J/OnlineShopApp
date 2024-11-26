import { Component, OnInit } from '@angular/core';
import { PenggunaService } from '../pengguna.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerError: string = ""
  nama: string = ""
  nohp: string = ""
  password: string = ""
  alamat: string = ""

  constructor(private pengguna: PenggunaService, private route: Router) { }

  ngOnInit() {
  }

  register(){
    if(this.nohp.length <= 2 ){
      this.registerError = "Nomor handphone terlalu pendek."
      return
    }
    if(this.password.length < 6){
      this.registerError = "Panjang password minimal 6 huruf."
      return
    }

    this.pengguna.register(this.nohp, this.password, this.nama, this.alamat).subscribe((data)=>{
      if(data.status === "err"){
        this.registerError = data.data
      }
      else{
        this.route.navigate(['/login']);
      }
    })
  }
}
