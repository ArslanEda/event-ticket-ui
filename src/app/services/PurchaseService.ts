import { BaseApiService } from "./BaseApiService";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PurchaseService {

    constructor(private api: BaseApiService) { }

    purchaseTicketAsGuest(fullName: string, email: string, eventId: number, quantity: number): Observable<any> {
        return this.api.send('PurchaseTicketAsGuest', { FullName: fullName, Email: email, EventId: eventId, Quantity: quantity }, false);
    }

    purchaseTicketWithLogin(eventId: number, quantity: number): Observable<any> {
        return this.api.send('PurchaseTicketWithLogin', { EventId: eventId, Quantity: quantity });
    }

    getUserPurchases(): Observable<{ purchaseId: number, eventId: number, quantity: number, totalPrice: number }[]> {
        return this.api.send('GetUserPurchases', {});
    }

}
