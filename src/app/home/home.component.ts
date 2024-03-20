import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { Housinglocation } from '../housinglocation';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';
import { DetailsComponent } from '../details/details.component';
import { Router } from '@angular/router';
import { AuthStateService } from '../auth-state.service';
import { SharedtokenService } from '../sharedtoken.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule ,HousingLocationComponent, DetailsComponent],
  template:`
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter (keyup)="filterResult(filter.value)">
      <!-- <button type="button" class="btn btn-outline-primary" (click)="filterResult(filter.value)"> Search </button> -->
      <button id="SignOut" type="submit"  class="btn btn-outline-primary" (click)="SignOut()" >Log Out</button>
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
    
      constructor(private token: SharedtokenService, 
        private authState: AuthStateService, public router: Router) {
          this.housingService.getAllHOusingLocations().then((housingLocationList: Housinglocation[]) =>{
            this.housingLocationList = housingLocationList
            this.filteredLocationList = this.housingLocationList;
          });
          
      }

      SignOut(){
        this.authState.setAuthState(false);
        this.token.removeToken();
        this.router.navigate(['login']);
     }

      filterResult(text: string){

        if (!text) {
           this.filteredLocationList = this.housingLocationList
           return;
        }

        this.filteredLocationList = this.housingLocationList.filter((housingLocation) => housingLocation?.city.toLowerCase().includes(text.toLowerCase()))
        
      }

      ResultFiltered()
      {
        console.log("all good")
      }
  
}
