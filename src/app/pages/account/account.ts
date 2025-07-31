import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../services/PurchaseService';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-account',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './account.html',
    styleUrls: ['./account.scss']
})
export class AccountComponent implements OnInit {

    purchases: { purchaseId: number; eventId: number; quantity: number; totalPrice: number; }[] = [];

    constructor(private purchaseService: PurchaseService) { }

    ngOnInit(): void {
        this.purchaseService.getUserPurchases().subscribe({
            next: (res) => this.purchases = res,
            error: () => alert('Satın alınan biletler yüklenemedi.')
        });
    }
}
