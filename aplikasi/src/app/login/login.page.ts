import { Component, OnInit } from '@angular/core';
import { PenggunaService } from '../pengguna.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  nohp: string = ""; // Phone number input
  password: string = ""; // Password input
  loginError: string = ""; // General error message display
  phoneError: string | null = null; // Specific error message for phone number
  passwordError: string | null = null; // Specific error message for password
  passwordType: string = 'password'; // Password visibility toggle
  loading: boolean = false; // Loading spinner indicator

  constructor(private pengguna: PenggunaService, private route: Router) { }

  ngOnInit() { }

  // Method to toggle password visibility
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  // Method to validate phone number input
  validatePhoneNumber() {
    const phoneRegex = /^[0-9]*$/;

    // Check if the input contains only numbers
    if (!phoneRegex.test(this.nohp)) {
      this.phoneError = "Nomor handphone hanya boleh berisi angka.";
    } 
    // Check if the input length is between 10 and 12
    else if (this.nohp.length < 10 || this.nohp.length > 12) {
      this.phoneError = "Nomor handphone harus terdiri dari 10 hingga 12 angka.";
    } 
    else {
      this.phoneError = null; // Clear error if valid
    }
  }

  login() {
    // Clear previous error messages
    this.loginError = "";
    this.phoneError = null;
    this.passwordError = null;

    // Basic validation for phone and password fields
    if (!this.nohp || this.nohp.length < 10 || this.nohp.length > 12 || !/^[0-9]*$/.test(this.nohp)) {
      this.phoneError = "Nomor handphone tidak sesuai.";
    }
    if (this.password.length < 6) {
      this.passwordError = "Password terlalu pendek.";
    }

    // Stop if there are validation errors
    if (this.phoneError || this.passwordError) {
      return;
    }

    this.loading = true; // Start the loading spinner

    this.pengguna.login(this.nohp, this.password).pipe(
      catchError((err) => {
        this.loading = false; // Stop loading spinner
        this.loginError = err.error?.message || "Gagal masuk. Silakan coba lagi.";
        return of(null); // Handle the error safely
      })
    ).subscribe((data) => {
      this.loading = false; // Stop the spinner
      if (data) {
        this.pengguna.simpanPengguna(data.data); // Save user data
        this.route.navigate(["/"]); // Redirect to home
      }
    });
  }

  // Navigate to Forgot Password Page
  navigateToForgotPassword() {
    this.route.navigate(["/lupapassword"]);
  }

  // Navigate to Sign-Up Page
  navigateToSignUp() {
    this.route.navigate(["/register"]);
  }
}
