import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BaseApiService {

    readonly apiUrl = 'https://localhost:7049/';

    constructor(private http: HttpClient) { }

    getHeaders(action: string, loginRequired: boolean = true): HttpHeaders {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'action': action
        });

        const token = localStorage.getItem('authorizationToken');
        if (loginRequired && !token) {
            throw new Error('Bu işlem için giriş yapmanız gerekiyor.');
        }

        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    }

    send(action: string, body: any, loginRequired: boolean = true): Observable<any> {
        return this.http.post(this.apiUrl, body, { headers: this.getHeaders(action, loginRequired) });
    }
}


