import { Component, Input, input } from '@angular/core';
import { Housinglocation } from '../housinglocation';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule, DetailsComponent],
  template: `
  
    <section class="listing">
        <img
        class="listing-photo"
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
        crossorigin
        />
    </section>
    
    <h2 class="listing-heading">{{ housingLocation.name }}</h2>
    <p class="listing-location">{{ housingLocation.city }}, {{ housingLocation.state }}</p>
    <button id="learnmore" type="button" class="btn btn-primary btn-sm" [routerLink]="['/details', housingLocation.id]">Learn More</button>
  
    
  `,
  styleUrl: './housing-location.component.css'
})
export class HousingLocationComponent {
    //pass the housing location object to the child component --> details component
    @Input() housingLocation!: Housinglocation
}
