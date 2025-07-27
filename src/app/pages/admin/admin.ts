import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/EventService';
import { DiscountService } from '../../services/DiscountService';
import { EventDiscountService } from '../../services/EventDiscountService';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss'],
})
export class AdminPanelComponent implements OnInit {eventForm!: FormGroup;
  eventDeleteForm!: FormGroup;
  discountForm!: FormGroup;
  discountDeleteForm!: FormGroup;
  assignForm!: FormGroup;

  constructor( private fb: FormBuilder, private eventService: EventService, private discountService: DiscountService, private eventDiscountService: EventDiscountService ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      totalCapacity: ['', [Validators.required, Validators.min(1)]]
    });

    this.eventDeleteForm = this.fb.group({
      eventId: ['', [Validators.required, Validators.min(1)]]
    });

    this.discountForm = this.fb.group({
      discountName: ['', Validators.required],
      discountType: ['', Validators.required],
      percentage: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.discountDeleteForm = this.fb.group({
      discountId: ['', [Validators.required, Validators.min(1)]]
    });

    this.assignForm = this.fb.group({
      eventId: ['', [Validators.required, Validators.min(1)]],
      discountId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  insertEvent() {
    const event= this.eventForm.value;
    this.eventService.insertEvent(event.name, event.category, event.startDate, event.endDate, event.location, event.price, event.totalCapacity)
      .subscribe(() => alert('Etkinlik eklendi!'));
  }

  deleteEvent() {
    const eventid = this.eventDeleteForm.value.eventId;
    this.eventService.deleteEvent(eventid)
      .subscribe(() => alert('Etkinlik silindi!'));
  }

  insertDiscount() {
    const discount = this.discountForm.value;
    this.discountService.insertDiscount(discount.discountName, discount.discountType, discount.percentage, discount.startDate, discount.endDate)
      .subscribe(() => alert('İndirim eklendi!'));
  }

  deleteDiscount() {
    const discountId = this.discountDeleteForm.value.discountId;
    this.discountService.deleteDiscount(discountId)
      .subscribe(() => alert('İndirim silindi!'));
  }

  addDiscountToEvent() {
    const evntdscnt = this.assignForm.value;
    this.eventDiscountService.AddEventToDiscount(evntdscnt.eventId, evntdscnt.discountId)
      .subscribe(() => alert('İndirim etkinliğe tanimlandi!'));
  }
}
