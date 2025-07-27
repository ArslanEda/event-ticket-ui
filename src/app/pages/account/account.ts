import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../services/PurchaseService';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-account',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './account.html',
    styleUrls: ['./account.scss']
})
export class AccountComponent implements OnInit {

    purchases: { purchaseId: number; eventId: number; quantity: number; totalPrice: number; }[] = [];

    constructor(private purchaseService: PurchaseService, private router: Router) { }

    ngOnInit(): void {
        this.purchaseService.getUserPurchases().subscribe({
            next: (res) => this.purchases = res,
            error: () => alert('Satın alınan biletler yüklenemedi.')
        });
    }

    logout(): void {
        localStorage.removeItem('authorizationToken');
        this.router.navigate(['/login']);
    }
}
