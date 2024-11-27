import { Component, OnInit } from '@angular/core';
import { PenggunaService } from '../pengguna.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerError: string = ""; // General error message
  nama: string = ""; // Name input
  nohp: string = ""; // Phone number input
  password: string = ""; // Password input
  alamat: string = ""; // Address input
  loading: boolean = false; // Loading state indicator

  passwordType: string = 'password'; // Password visibility toggle

  nameError: string | null = null; // Error message for name field
  phoneError: string | null = null; // Error message for phone number field
  passwordError: string | null = null; // Error message for password field
  addressError: string | null = null; // Error message for address field

  constructor(private pengguna: PenggunaService, private route: Router) {}

  ngOnInit() {}

  // Method to validate phone number input
  validatePhoneNumber() {
    const phoneRegex = /^[0-9]*$/;
    if (!phoneRegex.test(this.nohp)) {
      this.phoneError = "Nomor handphone hanya boleh berisi angka.";
    } else if (this.nohp.length < 10 || this.nohp.length > 12) {
      this.phoneError = "Nomor handphone harus terdiri dari 10 hingga 12 angka.";
    } else {
      this.phoneError = null;
    }
  }

  register() {
    // Clear previous error messages
    this.nameError = null;
    this.phoneError = null;
    this.passwordError = null;
    this.addressError = null;

    // Validate Name
    if (this.nama.trim().length === 0) {
      this.nameError = "Nama tidak boleh kosong.";
    }

    // Validate Phone Number
    if (this.nohp.trim().length === 0) {
      this.phoneError = "Nomor handphone tidak boleh kosong.";
    } else if (this.nohp.length < 10 || this.nohp.length > 12) {
      this.phoneError = "Nomor handphone harus terdiri dari 10 hingga 12 angka.";
    }

    // Validate Password
    if (this.password.trim().length === 0) {
      this.passwordError = "Password tidak boleh kosong.";
    } else if (this.password.length < 6) {
      this.passwordError = "Panjang password minimal 6 karakter.";
    }

    // Validate Address
    if (this.alamat.trim().length === 0) {
      this.addressError = "Alamat tidak boleh kosong.";
    }

    // Stop if there are validation errors
    if (this.nameError || this.phoneError || this.passwordError || this.addressError) {
      return;
    }

    this.loading = true; // Start loading indicator

    this.pengguna.register(this.nohp, this.password, this.nama, this.alamat).pipe(
      catchError((err) => {
        this.loading = false; // Stop loading indicator
        this.registerError = err.error?.message || "Gagal mendaftar. Silakan coba lagi.";
        return of(null); // Handle the error safely
      })
    ).subscribe((data) => {
      this.loading = false; // Stop loading indicator
      if (data && data.status === "err") {
        this.registerError = data.data; // Show server error message
      } else {
        this.route.navigate(['/login']); // Navigate to login page on success
      }
    });
  }

  // Method to toggle password visibility
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}
