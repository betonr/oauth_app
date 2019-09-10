
/** State Model - used in Auth module */
export interface AuthState {
    /** id of user logged */
    readonly userId: string;
    /** grans of user */
    readonly grants: string;
    /** access token of user */
    readonly token: string;
}
