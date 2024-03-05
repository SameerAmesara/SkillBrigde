export interface User {
    id: string,
    name: string;
}

export type NewUser = Omit<User, 'id'>;