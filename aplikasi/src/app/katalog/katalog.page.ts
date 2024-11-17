import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { KatalogServiceService } from '../katalog-service.service';

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.page.html',
  styleUrls: ['./katalog.page.scss'],
})
export class KatalogPage implements OnInit {

  numbers = [1,2,3,4,5,6]
  barangs:any = []
  index = 0;

  constructor(private katalog: KatalogServiceService) { }

  ngOnInit() {
    this.katalog.katalog().subscribe((data)=>{
      this.barangs = data
    })
  }

}
