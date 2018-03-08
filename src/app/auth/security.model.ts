
export enum AuthLevel {
    Super = 0,
    Admin = 1,
    Normal = 2,
    Monitor = 3,
    Outsider = 4,
}

export interface User {
    _id: string;
    id: string;
    email: string;
    auth: AuthLevel;
    firstName: string;
    lastName: string;
    props: Object;
    created: Date;
    modified: Date;
    pwdExpiry: Date;
}

export interface Credential {
    userID: string;
    password: string;
}

export enum UserCreateMode {
    Register = 'register',
    Create = 'create',
    Request = 'request'
}

export enum PasswordSetMode {
    Set = 'set',
    Reset = 'reset',
    ForceReset = 'force'
}

export enum UserStatus {
  Verified = 'verified',
  Active = 'active',
  Disabled = 'disabled',
  Flagged = 'flagged',
}
