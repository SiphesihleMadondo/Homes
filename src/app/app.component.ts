import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, RouterModule, LoginComponent],

  //inline templates
  template: `
  <main>
  <a [routerLink]="['/home']">
    <header class="brand-name">
      <img class="brand-logo" src="/assets/logo.jpg" alt="logo" aria-hidden="true"/> 
    </header>
  </a>
  <section class="content">
      <router-outlet></router-outlet>
  </section>

  </main>
  
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Homes';
}
