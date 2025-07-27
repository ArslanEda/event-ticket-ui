import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: []
})

export class HomeComponent {
  constructor(private router: Router) {}

  goToEvents() {
    this.router.navigate(['/events']); 
  }
}
