// angular import
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { UserDetails, NomineeRelation, AccountType, Roles } from 'src/app/jhmain/models/user-details';
declare let bootstrap: any; // To use Bootstrap J

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
  roles: {label: string, value: Roles}[] = [
    { label: 'User', value: Roles.User },
    { label: 'Admin', value: Roles.Admin },
    { label: 'Merchant', value: Roles.Merchant }
  ];

  userDetails: UserDetails = {
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
  errorMessage = '';
  successMessage = '';

  registerUser() {
    this.http.post(`${this.baseUrl}/auth-service/users/register`, this.userDetails, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({ 
      next: () => {
      //alert('Registration successful!.');
      this.successMessage = 'Registration successful!. Please login to continue.';
      this.showModal();
      this.route.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Registration failed! ' + err.error.errorMessage;
        this.showModal();
        console.error('There was an error during registration!', err);
      }
    });
  }

  showModal()
  {
    const modal = new bootstrap.Modal(document.getElementById('errorModal'));
        modal.show();
        setTimeout(() => modal.hide(), 2000);
  }

}
