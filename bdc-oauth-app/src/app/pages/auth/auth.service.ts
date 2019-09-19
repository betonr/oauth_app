import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Service to authentication
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

    /** base url of Oauth */
    private urlOauth = window['__env'].urlOauth;

    /** start http service client */
    constructor(private http: HttpClient) { }

    /**
     * login in OBT Oauth
     */
    public async login(credentials: object): Promise<any> {
        const urlSuffix = `/auth/login`;
        const response = await this.http.post(`${this.urlOauth}${urlSuffix}`, credentials).toPromise();
        return response;
    }

    /**
     * get Token in OBT Oauth
     */
    public async token(authenticationToken: string, service: string, scope: string): Promise<any> {
        let urlSuffix = `/auth/token?service=${service}`;
        if (scope) {
            urlSuffix += `&scope=${scope}`;
        }
        const response = await this.http.get(`${this.urlOauth}${urlSuffix}`, {
            headers: {
                Authorization: `Bearer ${authenticationToken}`
            }
        }).toPromise();
        return response;
    }
}
