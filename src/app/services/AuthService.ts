import { BaseApiService } from "./BaseApiService";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private api: BaseApiService) { }

    login(email: string, password: string): Observable<any> {
        return this.api.send('Login', { Email: email, Password: password }, false);
    }

    registerUser(userName: string, email: string, password: string, role: string, birthDate: string): Observable<any> {
        return this.api.send('RegisterUser', { UserName: userName, Email: email, Password: password, Role: role, BirthDate: new Date(birthDate).toISOString()}, false);
    }
}
