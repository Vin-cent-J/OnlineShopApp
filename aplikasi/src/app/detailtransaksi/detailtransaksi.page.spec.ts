import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailtransaksiPage } from './detailtransaksi.page';

describe('DetailtransaksiPage', () => {
  let component: DetailtransaksiPage;
  let fixture: ComponentFixture<DetailtransaksiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailtransaksiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
