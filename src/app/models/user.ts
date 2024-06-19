export interface User {
    id?:number;
    name:string;
    password: string;
    confirmPassword:string;
    email: string;
    dateOfBirth: string;
    token: string;
    role:string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
