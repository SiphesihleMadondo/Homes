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
      <input type="text" placeholder="Filter by city" #filter (keyup)="filterResult(filter.value)">
      <!-- <button type="button" class="btn btn-outline-primary" (click)="filterResult(filter.value)"> Search </button> -->
    </form>
  </section>

  <section class="results">
      <app-housing-location
       *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation">
    
    </app-housing-location>
    
  </section>

  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

      housingLocationList: Housinglocation[] = [];
      housingService: HousingService = inject(HousingService)
      filteredLocationList : Housinglocation[] = []
    
      constructor() {
          this.housingService.getAllHOusingLocations().then((housingLocationList: Housinglocation[]) =>{
            this.housingLocationList = housingLocationList
            this.filteredLocationList = this.housingLocationList;
          });
          
      }

      filterResult(text: string){

        if (!text) {
           this.filteredLocationList = this.housingLocationList
           return;
        }

        this.filteredLocationList = this.housingLocationList.filter(
          (housingLocation) => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
        )
      }
  
}
