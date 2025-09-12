import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  templateUrl: './user-login.html',
  imports: [CommonModule, FormsModule],
  styleUrl: './user-login.scss'
})
export class UserLogin {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private router: Router){ }

  onLogin() {
    if (!this.username || !this.password) {
      alert('Please enter both username and password.');
      return;
    }
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    this.router.navigate(["/dashboard"])
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
