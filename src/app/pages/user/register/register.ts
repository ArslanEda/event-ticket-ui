import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/AuthService';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  imports: [ReactiveFormsModule, RouterModule, CommonModule]
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/[A-Z]/), Validators.pattern(/[a-z]/), Validators.pattern(/[0-9]/)]],
      birthDate: ['', [Validators.required]]
    });
  }

  submitRegister() {
    if (this.form.invalid) {
      alert('Lütfen tüm alanları doğru şekilde doldurun.');
      return;
    }

    const { userName, email, password, role, birthDate } = this.form.value;

    this.authService.registerUser(userName, email, password, role, birthDate).subscribe({
      next: () => alert('Üye olundu!'),
      error: () => alert('Eksik ya da geçersiz giriş!')
    });
  }
}

