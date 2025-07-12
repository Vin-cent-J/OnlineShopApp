import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PenggunaService } from '../pengguna.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private pengguna: PenggunaService, private router: Router) {}

  canActivate(): Observable<boolean> {
    const pengguna = this.pengguna.ambilPengguna();
    return this.pengguna.admin(pengguna.id).pipe(
      map(data => {
        if (data.data == 1 || data.data == "1") {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/home']);
        return [false];
      })
    );
  }
}
