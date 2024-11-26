import { Component, OnInit } from '@angular/core';
import { PenggunaService } from '../pengguna.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginError: string = ""
  nohp: string = ""
  password: string = ""

  constructor(private pengguna: PenggunaService, private route: Router) { }

  ngOnInit() {    

  }

  login(){
    if(this.nohp.length <= 2 ){
      this.loginError = "Nomor handphone tidak sesuai."
      return
    }
    if(this.password.length < 6){
      this.loginError = " password terlalu pendek"
      return
    }

    this.pengguna.login(this.nohp, this.password).subscribe((data)=>{
      this.pengguna.simpanPengguna(data.data)
      this.route.navigate(["/"])
    })
  }

}
