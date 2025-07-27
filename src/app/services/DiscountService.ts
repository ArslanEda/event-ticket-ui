import { BaseApiService } from "./BaseApiService";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DiscountService {

    constructor(private api: BaseApiService) { }

    insertDiscount(discountName: string, discountType: string, percentage: number, startDate: string, endDate: string): Observable<any> {
        return this.api.send('InsertDiscount', { DiscountName: discountName, DiscountType: discountType, Percentage: percentage, StartDate: new Date(startDate).toISOString(), EndDate: new Date(endDate).toISOString() });
    }

    deleteDiscount(discountId: number): Observable<any> {
        return this.api.send('DeleteDiscount', { DiscountId: discountId });
    }
}
