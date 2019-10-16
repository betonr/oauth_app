import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Service to get infos and features of catalog
 */
@Injectable({ providedIn: 'root' })
export class ApplicationsService {

    /** url base of oauth server OBT */
    private urlOauth = window['__env'].urlOauth;

    /** start http service client */
    constructor(private http: HttpClient) { }

    /**
     * get All Users
     */
    public async getApplications(id): Promise<any> {
        const urlSuffix = `/clients/users/${id}`;
        const authenticationToken = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['token'] : '';
        const response = await this.http.get(`${this.urlOauth}${urlSuffix}`, {
            headers: {
                Authorization: `Bearer ${authenticationToken}`
            }
        }).toPromise();
        return response;
    }
}