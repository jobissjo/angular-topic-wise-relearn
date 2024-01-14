interface Address {
    street: string;
    country: string;
    city: string;
    region?: string;
    postal: string;
}

interface Experience {
    company: string;
    position: string;
    totalExp: number;
    startDate: string;
    endDate: string;
}

export interface UserForm {
    firstName: string;
    lastName: string;
    email: string;
    dob: Date | null;
    username: string;
    gender: string;
    address: Address;
    skills: string[];
    experience?: Experience[];
}