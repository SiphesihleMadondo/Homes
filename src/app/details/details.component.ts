import { CommonModule } from '@angular/common'
import { Component, Input, inject } from '@angular/core'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { HousingService } from '../housing.service'
import { Housinglocation } from '../housinglocation'
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { ApplicationComponent } from '../application/application.component'


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ApplicationComponent ],
  template: `
   
    <article>
      <button
        id="back"
        type="button"
        class="btn btn-outline-primary"
        [routerLink]="['/home']"
      >
        Back
      </button>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
        crossorigin
      />
    
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <br />
        <p class="listing-location">
          <br />
          <br />
          {{ housingLocation?.city }}, {{ housingLocation?.suburb}}
        </p>
      </section>

      <section class="listing-features">
      <div class="listing-wrapper">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>
            Does this location have laundry: {{ housingLocation?.laundry }}
          </li>
          <li>
            Does this location have parking: {{housingLocation?.parking}}
          </li>
        </ul>

      </div>
        
      </section>
      <button [disabled]="housingLocation?.availableUnits == 0" [routerLink]="['/application/',this.housingLocationId]" id="btn_apply" type="button" class="btn btn-primary">Apply now </button>
      
    </article>
    
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  //pass the housing location object to the child component --> application component.
  housingLocation!: Housinglocation | undefined
  route: ActivatedRoute = inject(ActivatedRoute)
  housingService = inject(HousingService)
  applyForm: any
  housingLocationId!: number

  // the constructor gets call first and initialises the variables
  constructor() {
    
    this.housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(this.housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
    console.log(this.housingLocationId, this.housingLocation?.photo)
    
  }

}
