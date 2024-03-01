import { CommonModule } from '@angular/common'
import { Component, Input, inject } from '@angular/core'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { HousingService } from '../housing.service'
import { Housinglocation } from '../housinglocation'
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
   
    <article>
      <button
        id="back"
        type="button"
        class="btn btn-outline-primary"
        [routerLink]="['/']"
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
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
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
      <button [routerLink]="['/application', housingLocation?.id]" id="btn_apply" type="button" class="btn btn-primary">Apply now to live here</button>
      
    </article>
    
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  //pass the housing location object to the child component --> details component
  @Input() housingLocation!: Housinglocation | undefined

  route: ActivatedRoute = inject(ActivatedRoute)
  housingService = inject(HousingService)
  applyForm: any

  // the constructor gets call first and initialises the variables
  constructor () {
    const housingLocationId = Number(this.route.snapshot.params['id'])
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId)
    
  }

}
