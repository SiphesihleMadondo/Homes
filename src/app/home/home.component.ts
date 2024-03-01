import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { Housinglocation } from '../housinglocation';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule ,HousingLocationComponent, DetailsComponent],
  template:`
  <section>
    <form>
      <input type="text" placeholder="Filter by city">
      <button type="button" class="btn btn-outline-primary"> Search </button>
    </form>
  </section>

  <section class="results">
      <app-housing-location
       *ngFor="let housingLocation of housingLocationList"
        [housingLocation]="housingLocation">
    
    </app-housing-location>
    
  </section>

  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

      housingLocationList: Housinglocation[] = [];
      housingService: HousingService = inject(HousingService)

    
      constructor() {
          this.housingLocationList = this.housingService.getAllHOusingLocations();
        
      }
  
}
