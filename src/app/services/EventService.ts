import { BaseApiService } from "./BaseApiService";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  constructor(private api: BaseApiService) { }

  insertEvent(name: string, category: string, startDate: string, endDate: string, location: string, price: number, totalCapacity: number): Observable<any> {
    return this.api.send('InsertEvent', { Name: name, Category: category, StartDate: new Date(startDate).toISOString(), EndDate: new Date(endDate).toISOString(), Location: location, Price: price, TotalCapacity: totalCapacity });
  }

  deleteEvent(eventId: number): Observable<any> {
    return this.api.send('DeleteEvent', { EventId: eventId });
  }

  getEventList(): Observable<{ eventId: number, category: string, name: string, startDate: string, endDate: string, location: string, price: number, availableCapacity: number }[]> {
    return this.api.send('GetEventList', {}, false);
  }

  getEventById(eventId: number): Observable<{ category: string, name: string, startDate: string, endDate: string, location: string, price: number, totalCapacity: number, ticketSold: number, availableCapacity: number }> {
    return this.api.send('GetEventById', { EventId: eventId }, false);
  }
}
