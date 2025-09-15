// angular import
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/jhmain/service/auth-service';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';

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

  baseUrl: string = "";
  constructor(private route: Router, private auth: AuthService, private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  loginUser() {
    this.http.post(`${this.baseUrl}/auth-service/Login/signin`, {
      "email": this.email(),
      "password": this.password()
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe((response: any) => {
      if (response.errorCode) { 
        alert(response.errorMessage);
      } else { 
        this.auth.setToken(response.responseBody.token);
        this.auth.setUser(response.responseBody.userDetail);
        this.route.navigate(['/analytics']);
      }
    })
  }

  saveToken(token: string) {
    localStorage.setItem('jwt', token);
  }
}
