import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MerekPage } from './merek.page';

describe('MerekPage', () => {
  let component: MerekPage;
  let fixture: ComponentFixture<MerekPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MerekPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
