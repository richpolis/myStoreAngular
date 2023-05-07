export interface User {
    id: number;
    name?: string;
    email: string;
}

export interface CreateUserDTO extends Omit<User, 'id'> {
    password: string;
}

export interface LoginUserDTO extends Omit<User, 'id'> {
    password: string;
}