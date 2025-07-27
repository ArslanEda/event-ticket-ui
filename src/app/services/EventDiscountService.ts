import { BaseApiService } from "./BaseApiService";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class EventDiscountService {

    constructor(private api: BaseApiService) { }

    AddEventToDiscount( eventId: number, discountId: number ): Observable<any> {
        return this.api.send('AddEventToDiscount', { EventId: eventId , DiscountId: discountId});
    }
}