export interface User {
    id: string,
    name: string;
}

export interface UserDetails {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    image: String; 
    dob: Date; 
    profession: string;
    companyName: string;
}

export type NewUser = Omit<UserDetails, 'id'>;
