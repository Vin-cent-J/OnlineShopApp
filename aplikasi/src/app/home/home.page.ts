import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { PenggunaService } from '../pengguna.service';
import { KatalogServiceService } from '../katalog-service.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  baseUrl = environment.apiUrl;

  constructor(private pengguna: PenggunaService, private katalog: KatalogServiceService, private router: Router, private cdr: ChangeDetectorRef) {}

  user: any = { id: 0, nama: '' };
  barangs: any[] = [];
  filteredItems: any[] = [];
  cari: string = '';

  kategori: any[] = [];
  merek: any[] = [];

  kategoriPilihan: any = null;
  merekPilihan: any = null;
  minHarga: any = null;
  maxHarga: any = null;

  ngOnInit() {
    this.user = this.pengguna.ambilPengguna();
    if(this.user === null){
      this.user = { id: 0, nama: '' };
    }
    console.log(this.user.id.length)
    this.loadbarangs();
    this.katalog.ambilKategori().subscribe((data)=>{
      if (data.status != "err"){
        this.kategori = data.data;
      }
    });
    this.katalog.ambilMerek().subscribe((data)=>{
      if (data.status != "err"){
        this.merek = data.data;
      }
    });
  }

  filter() {
    this.katalog.cariBarang(this.cari, this.merekPilihan, this.kategoriPilihan, this.minHarga, this.maxHarga, 1).subscribe((data)=>{
      if(data.status != "err"){
        this.barangs = data.data
        this.cdr.detectChanges();
      }
    });
  }

  loadbarangs() {
    this.katalog.katalog(1).subscribe(
      (data) => {
        this.barangs = data.data;
        this.filteredItems = this.barangs;
      }
    );
  }

  cariBarang(event: any) {
    if (event.key === 'Enter') {
      this.router.navigate(['/katalog/'], { queryParams: { q: this.cari } });
    }
  }

  filterByCategory(category: string) {
    this.kategoriPilihan = category;
    this.filterbarangs(this.cari, category);
  }

  filterbarangs(searchTerm: string, category: string) {
    this.filteredItems = this.barangs.filter(item => {
      const matchesSearchTerm = item.nama.toLowerCase().includes(searchTerm) ||
        item.deskripsi.toLowerCase().includes(searchTerm);
      const matchesCategory = category === 'All' || item.kategori === category;
      return matchesSearchTerm && matchesCategory;
    });
  }

  gantiMerek(event: any){
    const id = event.detail.value 
    this.katalog.cariBarang(null, id, null, this.minHarga, this.maxHarga, 1).subscribe(data =>{
      console.log(id);
      if(data.hasil != "err"){
        this.filteredItems = data.data
      }
    });
  }
}
