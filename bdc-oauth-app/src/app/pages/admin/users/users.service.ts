import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Service to get infos and features of catalog
 */
@Injectable({ providedIn: 'root' })
export class UsersService {

    /** url base of oauth server OBT */
    private urlOauth = window['__env'].urlOauth;

    /** start http service client */
    constructor(private http: HttpClient) { }

    /**
     * get All Users
     */
    public async getUsers(): Promise<any> {
        const urlSuffix = `/users/`;
        const authenticationToken = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['token'] : '';
        const response = await this.http.get(`${this.urlOauth}${urlSuffix}`, {
            headers: {
                Authorization: `Bearer ${authenticationToken}`
            }
        }).toPromise();
        return response;
    }

    /**
     * create User
     */
    public async create(data: object): Promise<any> {
        const urlSuffix = `/users/`;
        const authenticationToken = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['token'] : '';
        const response = await this.http.post(`${this.urlOauth}${urlSuffix}`, data, {
            headers: {
                Authorization: `Bearer ${authenticationToken}`
            }
        }).toPromise();
        return response;
    }

    /**
     * edit Basic User
     */
    public async update(userId: string, data: object): Promise<any> {
        const urlSuffix = `/users/${userId}`;
        const authenticationToken = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['token'] : '';
        const response = await this.http.put(`${this.urlOauth}${urlSuffix}`, data, {
            headers: {
                Authorization: `Bearer ${authenticationToken}`
            }
        }).toPromise();
        return response;
    }

    /**
     * change user password
     */
    public async changePass(userId: string, data: object): Promise<any> {
        const urlSuffix = `/users/change-password/${userId}`;
        const authenticationToken = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['token'] : '';
        const response = await this.http.put(`${this.urlOauth}${urlSuffix}`, data, {
            headers: {
                Authorization: `Bearer ${authenticationToken}`
            }
        }).toPromise();
        return response;
    }

    /**
     * get User by ID
     */
    public async getUserById(userId: string): Promise<any> {
        const urlSuffix = `/users/${userId}`;
        const authenticationToken = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['token'] : '';
        const response = await this.http.get(`${this.urlOauth}${urlSuffix}`, {
            headers: {
                Authorization: `Bearer ${authenticationToken}`
            }
        }).toPromise();
        return response;
    }

    /**
     * get users by Client ID
     */
    public async getUsersByApplication(clientId: string): Promise<any> {
        const urlSuffix = `/users/client/${clientId}`;
        const authenticationToken = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['token'] : '';
        const response = await this.http.get(`${this.urlOauth}${urlSuffix}`, {
            headers: {
                Authorization: `Bearer ${authenticationToken}`
            }
        }).toPromise();
        return response;
    }
}