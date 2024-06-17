import { User } from "firebase/auth";

export interface ApplicationUser {
    user: User | null;
    roles?: UserRole[];
}

export enum UserRole {
    ADMIN = 'ADMIN',
    EDITOR = 'EDITOR',
    USER = 'USER'
}