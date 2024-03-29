import { Component, inject } from '@angular/core';
import { HousingService } from '../housing.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Housinglocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Applicant } from '../applicant';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
  <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=yes" >
   <button
        id="back"
        type="button"
        class="btn btn-outline-primary"
        [routerLink]="['/details/',this.housingLocation?.id]"
      >
        Back
      </button>
  <main class="container" [ngStyle]="{backgroundImage: 'url('+ this.housingLocation?.photo +')'}">
  
    <section class="listing-apply">
    <h2 class="section-heading">Apply now to live here</h2>
    <br/>
        <form [formGroup]="applyForm" (submit)="submitApplication()" ngNativeValidate>

          <div class="col-md-4">
            <label for="first-name">First Name </label>
            <input id="first-name" type="text" formControlName = "firstName" required/>
          </div>

          <div class="col-md-4">
            <label for="last-name">Last Name </label>
            <input id="last-name" type="text" formControlName = "lastName" required />
          </div>

          <div class="col-md-4">
            <label for="email">Email </label>
            <input id="email" type="email" formControlName = "email" required />
          </div>
          
          <div class="col-md-4">
            <label for="phonenumber">Phone number </label>
            <input id="phonenumber" type="text" formControlName = "phonenumber" required />
          </div>

          <div class="col-md-6">
            <button id="btn-send-app" type="submit" class="btn btn-primary"> Send Application</button>
          </div>
           
        </form>
      </section>
    
  </main>
  `,
  styleUrl: './application.component.css'
})
export class ApplicationComponent {
        
        route: ActivatedRoute = inject(ActivatedRoute)
        housingService = inject(HousingService)
        housingLocation: Housinglocation | undefined

        applyForm: any;
        applicants: Applicant [] = []
       
        constructor(protected _housingService: HousingService, private metaService: Meta) {
          
          const housingLocationId = parseInt(this.route.snapshot.params['id'], 10)
          this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
            this.housingLocation = housingLocation;
          })
          
          // the field must be in similar order as those of an interface to be able to post them correctly
          this.applyForm = new FormGroup({
            firstName : new FormControl(''),
            lastName : new FormControl(''),
            email: new FormControl(''),
            phonenumber: new FormControl('')
          })
          console.log(housingLocationId, this.housingLocation?.photo)
        }

        async submitApplication(){  

         this.housingService.submitApplication(
            this.applyForm.value.firstName ?? '',
            this.applyForm.value.lastName ?? '',
            this.applyForm.value.email ?? '',
            this.applyForm.value.cellno ?? ''

          ); 

      (await this._housingService.createApplication(this.applyForm.value)).subscribe((applicant: any) => (console.log(applicant)))  
          
            this.applyForm.reset();
            alert('Congradulations you have successfully applied!!')
      }

}
