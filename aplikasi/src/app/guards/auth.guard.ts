import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('pengguna');

    if (user) {
      return true; 
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}