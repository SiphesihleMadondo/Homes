import { Component, inject } from '@angular/core';
import { HousingService } from '../housing.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Housinglocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
   <button
        id="back"
        type="button"
        class="btn btn-outline-primary"
        [routerLink]="['/details', housingLocationId]"
      >
        Back
      </button>
  <main class="container" [ngStyle]="{backgroundImage: 'url('+ this.housingLocation?.photo +')'}">
    <section class="listing-apply">
        <h2 class="section-heading">Application</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
            <label for="first-name">First Name </label>
            <input id="first-name" type="text" formControlName = "firstName"/>

            <label for="last-name">Last Name </label>
            <input id="last-name" type="text" formControlName = "lastName" />

            <label for="email">Email </label>
            <input id="email" type="email" formControlName = "email" />
            <button type="submit" class="btn btn-primary"> Apply now</button>
        </form>
      </section>
  </main>
  `,
  styleUrl: './application.component.css'
})
export class ApplicationComponent {
        image = '/assets/estate-background-image.jpg';
        route: ActivatedRoute = inject(ActivatedRoute)
        housingService = inject(HousingService)
        housingLocation: Housinglocation | undefined

        applyForm: any;
        housingLocationId?: number
        constructor() {
          
          this.housingLocationId = Number(this.route.snapshot.params['id'])
          this.housingLocation = this.housingService.getHousingLocationById(this.housingLocationId)

          this.applyForm = new FormGroup({
            firstName : new FormControl(''),
            lastName : new FormControl(''),
            email: new FormControl(''),
          })
          
        }

        submitApplication(){
          this.housingService.submitApplication(
            this.applyForm.value.firstName ?? '',
            this.applyForm.value.lastName ?? '',
            this.applyForm.value.email ?? '',
          )
          console.log(this.housingLocationId, this.housingLocation?.photo)
      }
}
