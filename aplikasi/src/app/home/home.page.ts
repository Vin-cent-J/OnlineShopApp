import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { PenggunaService } from '../pengguna.service';
import { KatalogServiceService } from '../katalog-service.service';

register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private pengguna: PenggunaService, private katalogService: KatalogServiceService) {}

  user: any = { id: 0, nama: '' };
  catalogItems: any[] = [];
  filteredItems: any[] = [];
  cari: string = '';
  selectedCategory: string = 'All';

  ngOnInit() {
    this.user = this.pengguna.ambilPengguna();
    this.loadCatalogItems();
  }

  logout() {
    this.pengguna.logout();
  }

  loadCatalogItems() {
    this.katalogService.katalog(1).subscribe(
      (data) => {
        this.catalogItems = data;
        this.filteredItems = this.catalogItems;
      },
      (error) => {
        console.error('Error loading catalog items', error);
      }
    );
  }

  searchItems(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filterCatalogItems(searchTerm, this.selectedCategory.toString());
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.filterCatalogItems(this.cari, category);
  }

  filterCatalogItems(searchTerm: string, category: string) {
    this.filteredItems = this.catalogItems.filter(item => {
      const matchesSearchTerm = item.nama.toLowerCase().includes(searchTerm) ||
        item.deskripsi.toLowerCase().includes(searchTerm);
      const matchesCategory = category === 'All' || item.kategori === category;
      return matchesSearchTerm && matchesCategory;
    });
  }
}
