import { Component } from '@angular/core';
import { AuthService } from '../service/auth-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SharedModule } from '../../theme/shared/shared.module';
//import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  imports: [SharedModule],
  templateUrl: './user.html',
  styleUrl: './user.scss'
})
export class UserCompnent {
  userDetail: any = {};
  baseUrl = "";

  constructor(private auth: AuthService,
    private http: HttpClient
  ) {
    this.baseUrl = environment.apiUrl;
    this.userDetail = this.auth.loadUser();
  }

  update() {
    this.http.post(`${this.baseUrl}/auth-service/Users/update`, {
      "userId": 10
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe((response: any) => {
      if (response.errorCode) {
        alert(response.errorMessage);
      } else {

      }
    })
  }
}