import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})

export class NavbarComponent {

  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    return localStorage.getItem('authorizationToken') !== null;
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('authorizationToken');
    if (!token){
      return false;  
    } 
    const decoded: any = jwtDecode(token);
    return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'admin';
  }

  logout(): void {
    localStorage.removeItem('authorizationToken');
    this.router.navigate(['/login']);
  }
}
