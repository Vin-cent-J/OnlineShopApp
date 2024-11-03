import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.page.html',
  styleUrls: ['./katalog.page.scss'],
})
export class KatalogPage implements OnInit {

  numbers = [1,2,3,4,5,6]
  index = 0;

  constructor() { }

  ngOnInit() {
    
  }

}
