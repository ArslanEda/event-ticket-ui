import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PurchaseService } from '../../services/PurchaseService';
import { EventService } from '../../services/EventService';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event.html',
  styleUrls: ['./event.scss']
})

export class EventListComponent implements OnInit {

  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  events: { eventId: number; category: string; name: string; startDate: string; endDate: string; location: string; price: number; availableCapacity: number; }[] = [];

  quantityForm: { [eventId: number]: FormGroup } = {};
  guestForm!: FormGroup;
  showGuestPopup = false;
  selectedEventId: number | null = null;

  constructor(private eventService: EventService, private purchaseService: PurchaseService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadEvents();
    this.initGuestForm();
  }

  loadEvents() {
    this.eventService.getEventList().subscribe({
      next: res => {
        this.events = res;
        res.forEach(event => {
          this.quantityForm[event.eventId] = this.fb.group({
            quantity: [1, [Validators.required, Validators.min(1), Validators.max(event.availableCapacity)]]
          });
        });
      },
      error: () => alert('Etkinlikler yüklenemedi')
    });
  }

  initGuestForm() {
    this.guestForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authorizationToken');
  }

  handlePurchase(eventId: number) {
    const form = this.quantityForm[eventId];
    if (!form.valid){
      return alert('Geçerli bir adet girin.'); 
    } 

    const quantity = form.value.quantity;

    if (this.isLoggedIn()) {
      this.purchaseService.purchaseTicketWithLogin(eventId, quantity).subscribe({
        next: () => alert('Satın alma başarılı'),
        error: () => alert('Satın alma başarısız')
      });
    } else {
      this.selectedEventId = eventId;
      this.showGuestPopup = true;
    }
  }

  confirmGuestPurchase() {
    if (!this.guestForm.valid || this.selectedEventId === null) {
      return alert('Lütfen bilgileri doldurun.');
    }

    const quantity = this.quantityForm[this.selectedEventId].value.quantity;

    this.purchaseService.purchaseTicketAsGuest(
      this.guestForm.value.fullName,
      this.guestForm.value.email,
      this.selectedEventId,
      quantity
    ).subscribe({
      next: () => {
        alert('Satın alma başarılı');
        this.closePopup();
      },
      error: () => alert('Satın alma başarısız')
    });
  }

  closePopup() {
    this.showGuestPopup = false;
    this.selectedEventId = null;
    this.guestForm.reset();
  }

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({ left: -290, behavior: 'smooth' });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({ left: 290, behavior: 'smooth' });
  }

  getImage(category: string): string {
    const images: Record<string, string> = {
      konser: 'assets/music.png',
      tiyatro: 'assets/theatre.png',
      teknoloji: 'assets/technology.png',
      festival: 'assets/art.png'
    };
    return images[category.toLowerCase()] || 'assets/event.jpg';
  }
}
