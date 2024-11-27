import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailbarangPage } from './detailbarang.page';

describe('DetailbarangPage', () => {
  let component: DetailbarangPage;
  let fixture: ComponentFixture<DetailbarangPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailbarangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
