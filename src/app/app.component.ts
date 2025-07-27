import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent} from './pages/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, NavbarComponent]
})
export class AppComponent {}
