export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface AccountDetails {
    accountNumber: string;
    bankName: string;
    bankCode: string;
    branch: string;
    ifscCode: string;
    cvv: string;
    upiId: string;
    dateOfExpiry: string;
    accountType?: undefined | AccountType;
    nominee: string;
    relationWithNominee?: undefined | NomineeRelation;
    isActive: boolean;
    balance?: number;
}

export interface UserDetails{
    userId: number;
    firstName: string;
    lastName: string;
    age?: number;
    email: string;
    password: string;
    phoneNumber: string;
    address: Address;
    accountDetails: AccountDetails;
    role: Roles;
}

export enum AccountType
{
    Saving,
    Checking,
    Loan,
    Business
}

export enum NomineeRelation
{
    Father,
    Mother,
    Brother,
    Sister,
    Spouse,
    Child,
    Husband,
}

export enum Roles
{
    User,
    Admin,
    Merchant
}