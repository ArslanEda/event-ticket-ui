import { Component } from '@angular/core';
import { AuthService } from '../../../services/AuthService';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})

export class LoginComponent {

  userForm: FormGroup;

  constructor(private formbuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.userForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  submitLogin(): void {
    if (this.userForm.invalid) {
      alert('Lütfen tüm alanları doğru şekilde doldurun.');
      return;
    }

    const { email, password } = this.userForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        localStorage.setItem('authorizationToken', res.token);
        const decoded: any = jwtDecode(res.token);
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/events']);
        }
      }
    });
  }
}

