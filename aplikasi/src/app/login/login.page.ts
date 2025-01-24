import { Component, OnInit } from '@angular/core';
import { PenggunaService } from '../pengguna.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  nohp: string = ""; 
  password: string = ""; 
  loginError: string = ""; 
  phoneError: string | null = null; 
  passwordError: string | null = null; 
  passwordType: string = 'password'; 
  loading: boolean = false; 

  constructor(private pengguna: PenggunaService, private route: Router) { }

  ngOnInit() { }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  validatePhoneNumber() {
    const phoneRegex = /^[0-9]*$/;

    if (!phoneRegex.test(this.nohp)) {
      this.phoneError = "Nomor handphone hanya boleh berisi angka.";
    } 
    else if (this.nohp.length < 10 || this.nohp.length > 14) {
      this.phoneError = "Nomor handphone harus terdiri dari 10 hingga 14 angka.";
    } 
    else {
      this.phoneError = null;
    }
  }

  login() {
    this.loginError = "";
    this.phoneError = null;
    this.passwordError = null;

    if (!this.nohp || this.nohp.length < 10 || this.nohp.length > 14 || !/^[0-9]*$/.test(this.nohp)) {
      this.phoneError = "Nomor handphone tidak sesuai.";
    }
    if (this.password.length < 6) {
      this.passwordError = "Password terlalu pendek.";
    }

    if (this.phoneError || this.passwordError) {
      return;
    }

    this.loading = true;

    this.pengguna.login(this.nohp, this.password).subscribe(data => {
      this.loading = false; 
      if (data.hasil !== "err") {
        this.pengguna.simpanPengguna(data.data); 
        this.route.navigate(["/"]); 
      } else {
        this.loading = false;
        this.loginError = "Gagal masuk. Silakan coba lagi.";
        return;
      }
    });
  }

  navigateToSignUp() {
    this.route.navigate(["/register"]);
  }
}
