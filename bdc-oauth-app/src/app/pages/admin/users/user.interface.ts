/**
 * User  properties
 */
export interface User extends UserBase, UserAdditional, UserPassword {}

/**
 * User - base properties
 */
export interface UserBase {
    name: string;
    email: string;
    admin?: boolean;
    created_at?: string;
}

/**
 * User - additional properties
 */
export interface UserAdditional {
    institution?: string;
    occupation?: string;
}

/**
 * User - credentials properties
 */
export interface UserCredential {
    username: string;
}

/**
 * User password properties
 */
export interface UserPassword {
    old_password?: string;
    password: string;
    confirm_password: string;
}
