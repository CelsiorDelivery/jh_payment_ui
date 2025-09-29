// angular import
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth-service';
import { environment } from '../../../../../environments/environment';
import { SharedModule } from '../../../../theme/shared/shared.module';
declare let bootstrap: any; // To use Bootstrap J

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  email = signal('');
  password = signal('');

  baseUrl: string = '';
  errorMessage: any;
  constructor(
    private route: Router,
    private auth: AuthService,
    private http: HttpClient
  ) {
    this.baseUrl = environment.apiUrl;
  }

  loginUser() {
    this.http
      .post(
        `${this.baseUrl}/auth-service/Login/signin`,
        {
          userEmail: this.email(),
          password: this.password()
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      .subscribe({
        next: (response: any) => {
          this.auth.setToken(response.responseBody.accessToken);
          this.auth.setUser(response.responseBody.userDetail);
          this.route.navigate(['/analytics']);
        },
        error: (error) => {
          //alert('Login failed. Invalid username or password.');
          this.errorMessage = 'Login failed. Invalid username or password.';
          this.showModal();
          console.error('There was an error in Login!', error);
        }
      });
  }

  showModal()
  {
    const modal = new bootstrap.Modal(document.getElementById('errorModal'));
        modal.show();
        setTimeout(() => modal.hide(), 2000);
  }

  saveToken(token: string) {
    localStorage.setItem('jwt', token);
  }
}
