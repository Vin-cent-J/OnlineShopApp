import { Component, OnInit } from '@angular/core';
import { PenggunaService } from '../pengguna.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  constructor(private pengguna: PenggunaService, private router: Router) { }

  user = this.pengguna.ambilPengguna();
  profil: any = {id:0, nama:"", alamat:"", nomor_hp: ""}
  password = "";
  passwordBaru = "";
  error = "";
  namaError = "";
  noHpError = "";
  passwordError = "";
  konfirmasiError = "";
  alamatError = "";

  
  ngOnInit() {
    if(this.user != null){
      this.pengguna.ambilProfil(this.user.id).subscribe((data)=>{
        if(data.hasil !== "err"){
          console.log(data);
          this.profil = data.data;
        }
      })
    }
  }

  ubahProfil(){
    if (this.profil.nama.trim().length === 0) {
      this.namaError = "Nama tidak boleh kosong.";
    }

    if (this.profil.nomor_hp.trim().length === 0) {
      this.noHpError = "Nomor handphone tidak boleh kosong.";
    } else if (this.profil.nomor_hp.length < 10 || this.profil.nomor_hp.length > 14) {
      this.noHpError = "Nomor handphone harus terdiri dari 10 hingga 14 angka.";
    }
    
    if (this.password.length < 6) {
      this.passwordError = "Panjang password minimal 6 karakter.";
    }

    if(this.passwordBaru === this.password){
      this.konfirmasiError = "Password baru tidak boleh sama."
    }

    if (this.profil.alamat.trim().length === 0) {
      this.alamatError = "Alamat tidak boleh kosong.";
    }

    if (this.namaError || this.noHpError || this.passwordError || this.alamatError) {
      return;
    }
    this.pengguna.ubahData(this.profil.nomor_hp, this.profil.nama, this.profil.alamat, this.password, this.passwordBaru).subscribe(data => {
      console.log(data);
      if(data.hasil === "err"){
        this.error = data.data;
      }
    })
  }

  logout() {
    this.pengguna.logout();
    this.router.navigate(['/login'])
  }

}
