import { Component, OnInit } from '@angular/core';
import { PenggunaService } from '../pengguna.service';
import { Router } from '@angular/router';
import { ProvinsiService } from '../provinsi.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  constructor(private pengguna: PenggunaService, private router: Router, private provinsis: ProvinsiService) { }

  user = this.pengguna.ambilPengguna();
  profil: any = {id:0, nama:"", alamat:"", nomor_hp: ""}
  alamats : any[]= [];
  alamat = "";
  password = "";
  passwordBaru = "";
  error = "";
  success = "";
  namaError = "";
  noHpError = "";
  passwordError = "";
  konfirmasiError = "";
  alamatError = "";
  isOpen = false;
  isEditMode = true;
  idAlamat = '0';
  provinsi:any[] = [];
  kota:any[] = [];

  kot = ""
  prov = ""
  
  ngOnInit() {
    if(this.user != null){
      this.pengguna.ambilProfil(this.user.id).subscribe((data)=>{
        if(data.hasil !== "err"){
          this.profil = data.data;
        }
      });
      this.getAlamat();
      this.provinsis.getProvinsi().subscribe(data=>{
        this.provinsi = data;
      })
    }
  }

  handleChange(event: any){
    const id=event.detail.value.id;
    this.prov = event.detail.value.nama;
    this.provinsis.getKota(id).subscribe(data=>{
      this.kota = data;
    });
  }

  onChange(event: any){
    console.log("test")
    this.kot = event.detail.value.nama;
  }

  getAlamat(){
    this.pengguna.ambilAlamat(this.user.id).subscribe(data=>{
      if(data.hasil !== "err"){
        this.alamats = data.data;
      }
    });
  }

  ubahProfil(){
    this.namaError = "";
    this.noHpError = "";
    this.passwordError = "";
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
      return;
    }

    if(this.passwordBaru === this.password){
      this.konfirmasiError = "Password baru tidak boleh sama."
    }

    if (this.namaError || this.noHpError || this.passwordError) {
      return;
    }
    this.pengguna.ubahData(this.user.id, this.profil.nomor_hp, this.profil.nama, this.password, this.passwordBaru).subscribe(data => {
      console.log(data);
      if(data.hasil === "err"){
        this.error = data.data;
      } else {
        this.success = data.data;
      }
    })
  }


  provinsiPilihan = ""
  kotaPilihan = ""
  bukaModalUpdate(alamat: any){
    this.isOpen = true;
    this.isEditMode = true;
    this.alamat = alamat.alamat;
    this.idAlamat = alamat.id;
    this.provinsiPilihan = alamat.provinsi;
    this.kotaPilihan = alamat.kota;

  }
  bukaModalTambah(){
    this.isOpen = true;
    this.isEditMode = false;
  }
  tutupModal(){
    this.isOpen = false;
    this.provinsiPilihan = "";
    this.kotaPilihan = "";
  }
  simpanAlamat(){
    if (this.alamat.trim().length === 0) {
      this.alamatError = "Alamat tidak boleh kosong.";
    }
    if(this.isEditMode){
      this.pengguna.ubahAlamat(this.idAlamat, this.alamat, false, this.kot ,this.prov).subscribe(data=>{
        if(data.hasil == "success"){
          this.getAlamat();
        }
      });
    } 
    else {
      this.pengguna.tambahAlamat(this.user.id, this.alamat, this.kot ,this.prov).subscribe(data => {
        if(data.hasil == "success"){
          this.getAlamat();
        }
      });
    }
    
  }

  logout() {
    this.pengguna.logout();
    this.router.navigate(['/login'])
  }

}
