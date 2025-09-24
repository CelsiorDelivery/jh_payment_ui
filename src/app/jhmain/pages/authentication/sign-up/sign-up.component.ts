// angular import
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../theme/shared/shared.module';
//import { AuthService } from '../../../service/auth-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { UserDetails, NomineeRelation, AccountType, Roles } from 'src/app/jhmain/models/user-details';
// project import
//import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-sign-up',
  imports: [SharedModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  private http = inject(HttpClient);
    private route = inject(Router);
  baseUrl = environment.apiUrl;
  accountTypes: { label: string; value: AccountType }[] = [
    { label: 'Saving', value: AccountType.Saving },
    { label: 'Checking', value: AccountType.Checking },
    { label: 'Loan', value: AccountType.Loan },
    { label: 'Business', value: AccountType.Business }
  ];
  nomineeRelations: { label: string; value: NomineeRelation }[] = [
    { label: 'Father', value: NomineeRelation.Father },
    { label: 'Mother', value: NomineeRelation.Mother },
    { label: 'Brother', value: NomineeRelation.Brother },
    { label: 'Sister', value: NomineeRelation.Sister },
    { label: 'Spouse', value: NomineeRelation.Spouse },
    { label: 'Child', value: NomineeRelation.Child },
    { label: 'Husband', value: NomineeRelation.Husband }
  ];

  userDetails: UserDetails = {
    userId: 0,
    firstName: '',
    lastName: '',
    age: undefined,
    email: '',
    password: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    accountDetails: {
      accountNumber: '',
      bankName: '',
      bankCode: '',
      branch: '',
      ifscCode: '',
      cvv: '',
      upiId: '',
      dateOfExpiry: '',
      accountType: AccountType.Saving,
      nominee: '',
      relationWithNominee: NomineeRelation.Father,
      isActive: false,
      balance: undefined,
    },
    role: Roles.User
  };

  registerUser() {
    this.http.post(`${this.baseUrl}/auth-service/users/register`, this.userDetails, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe((response: any) => {
      if (response.errorCode) { 
      alert(response.errorMessage);
      } else { 
      alert('Registration successful!.');
      this.route.navigate(['/login']);
      }
    });
  }

}
