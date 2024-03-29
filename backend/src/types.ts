export interface User {
  id: string;
  name: string;
}

export interface Mentor {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  imageUrl: string;
  ratings: string;
  bio: string;
  email: string;
  phoneNumber: string;
  experience: string;
  pay: string;
  expertise: string;
  resume: string;
  availability: string;
  termsAccepted: string;
}

export type NewUser = Omit<User, "id">;
export type NewMentor = Omit<Mentor, "id">;
