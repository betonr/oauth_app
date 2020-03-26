/**
 * Client properties
 */
export interface Client {
    _id?: string;
    client_name: string;
    client_uri?: string;
    redirect_uri: string;
    type_secret: string;
    client_secret: string;
}
