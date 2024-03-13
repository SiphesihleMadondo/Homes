import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStateService } from '../auth-state.service';
import { SharedtokenService } from '../sharedtoken.service';
import { HousingService } from '../housing.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DatepickerAdapterService } from '../datepicker-adapter.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule
  ],
  providers: [{provide: NgbDateAdapter, useClass: DatepickerAdapterService}]
})
export class LoginComponent implements OnInit {
  private modalService = inject(NgbModal);
	closeResult = '';
  loginForm: FormGroup;
  errors:any = null;
  results: any [] = []
  email?: string 
  password?:string
  registerform: any
  model1?: string;
  model2?: string;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: HousingService,
    private token: SharedtokenService,
    private authState: AuthStateService
  ) { this.loginForm = this.fb.group({ email: new FormControl('', [Validators.required]), password: [],});
    
    this.registerform = new FormGroup({
      email : new FormControl(''),
      password: new FormControl(''),
      dateofbirth: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      province: new FormControl(''),
      code: new FormControl(''),
      city: new FormControl('')
    })

  }

  

  ngOnInit() {}


  async onSubmit() {
    (await this.authService.returnClients()).subscribe(
        result => {
          this.responseHandler(result);
        
        // iterating through password
        for (let index = 0; index < result.length; index++) {
              if (this.loginForm.value.email == result[index].email || this.loginForm.value.password == result[index].password) {
                  this.email = result[index].email
                  this.password = result[index].password
                  break;
              }
              else
              {
                this.email = "",
                this.password = ""
              }
  
        }

         if((this.loginForm.value.email == this.email) && (this.loginForm.value.email != '') && (this.loginForm.value.password == this.password))
          {
            this.authState.setAuthState(true);
            this.loginForm.reset();
            this.router.navigate(['/home']);

          }else{
            if ((this.loginForm.value.email == '' || this.loginForm.value.email !== this.email )){
              this.errors = 'Please enter a correct email address'
            }
            else{
              this.errors = 'Please enter a correct password'
            }
          }
          
          console.log(this.email)
        },
     );
      console.log(this.loginForm.value)
      
  }

  // Handle response
  responseHandler(data:any) {
    this.token.handleData(data.access_token);
    sessionStorage.setItem('loggedUser', data.user);
    sessionStorage.setItem('User_Id', data.user_id);
    sessionStorage.setItem('Client', data.client);
  }

  open(content: TemplateRef<any>){
     this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'}).result.then(
        (result) =>{
          this.closeResult = `Closed with: ${result}`
        }
      )
  }
  
 async signup(){
    (await this.authService.signup(this.registerform.value)).subscribe((user: any ) => (console.log(user)))

    if (this.registerform.value != null) {
      alert("Congratulations you have successfully registered.")
    }
    
    this.registerform.reset()
  }
}
