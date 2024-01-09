export interface GenderType {
    id: string;
    value: string;
    display: string
}

export interface Address {
    street1: string;
    street2?: string;
    country?: string;
    city: string;
    region?: string;
    postalCode: number;
}

export interface PersonDetails {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    dob: Date;
    userName: string;
    address: Address;
    gender?: string;
    agreement:boolean;
}
