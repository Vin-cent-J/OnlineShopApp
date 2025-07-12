import { Component, OnInit } from '@angular/core';
import { PenggunaService } from '../pengguna.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ProvinsiService } from '../provinsi.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerError: string = ""; 
  nama: string = "";
  nohp: string = "";
  password: string = "";
  alamat: string = "";
  loading: boolean = false;
  uuid: any
  provinsi:any[] = [];
  kota:any[] = [];
  prov= "";
  kot= "";

  passwordType: string = 'password';

  nameError: string | null = null;
  phoneError: string | null = null;
  passwordError: string | null = null;
  addressError: string | null = null;

  constructor(private pengguna: PenggunaService, private route: Router, private provinsis: ProvinsiService) {}

  ngOnInit() {
    this.provinsis.getProvinsi().subscribe(data=>{
      this.provinsi = data;
    })
  }

  validatePhoneNumber() {
    const phoneRegex = /^[0-9]*$/;
    if (!phoneRegex.test(this.nohp)) {
      this.phoneError = "Nomor handphone hanya boleh berisi angka.";
    } else if (this.nohp.length < 10 || this.nohp.length > 12) {
      this.phoneError = "Nomor handphone harus terdiri dari 10 hingga 12 angka.";
    } else {
      this.phoneError = null;
    }
  }

  register() {
    this.nameError = null;
    this.phoneError = null;
    this.passwordError = null;
    this.addressError = null;
    this.uuid = uuidv4();

    if (this.nama.trim().length === 0) {
      this.nameError = "Nama tidak boleh kosong.";
    }

    if (this.nohp.trim().length === 0) {
      this.phoneError = "Nomor handphone tidak boleh kosong.";
    } else if (this.nohp.length < 10 || this.nohp.length > 14) {
      this.phoneError = "Nomor handphone harus terdiri dari 10 hingga 14 angka.";
    }

    if (this.password.trim().length === 0) {
      this.passwordError = "Password tidak boleh kosong.";
    } else if (this.password.length < 6) {
      this.passwordError = "Panjang password minimal 6 karakter.";
    }

    if (this.alamat.trim().length === 0) {
      this.addressError = "Alamat tidak boleh kosong.";
    }

    if (this.nameError || this.phoneError || this.passwordError || this.addressError) {
      return;
    }

    this.loading = true;

    this.pengguna.register(this.uuid, this.nohp, this.password, this.nama, this.alamat, this.prov, this.kot).subscribe((data)=>{
      if(data.hasil === "err"){
        this.registerError = data.data
      }
      else{
        this.loading = false;
        this.route.navigate(['/login']);
      }
    });
  }

  handleChange(event: any){
    const id=event.detail.value.id;
    this.prov = event.detail.value.nama;
    this.provinsis.getKota(id).subscribe(data=>{
      this.kota = data;
    });
  }

  onChange(event: any){
    this.kot = event.detail.value.nama;
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}
