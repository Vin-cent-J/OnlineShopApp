import { Component, OnInit } from '@angular/core';
import { PenggunaService } from '../pengguna.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  constructor(private pengguna: PenggunaService) { }

  user = this.pengguna.ambilPengguna();
  profil: any = {id:0, nama:"", alamat:"", nomor_hp: ""}
  
  ngOnInit() {
    if(this.user != null){
      this.pengguna.ambilProfil(this.user.id).subscribe((data)=>{
        if(data.hasil !== "err"){
          this.profil = data.data;
        }
      })
    }
  }

}
