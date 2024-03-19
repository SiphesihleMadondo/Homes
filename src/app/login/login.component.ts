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
import { Provinces } from '../provinces';
import { Meta } from '@angular/platform-browser'; 


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
[x: string]: any;
  private modalService = inject(NgbModal);
	closeResult = '';
  profile!: FormGroup;
  errors:any = null;
  results: any [] = []
  email?: string 
  password?:string
  registerform: any
  model1?: string;
  model2?: string;
  provinces? : Provinces | any

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public authService: HousingService,
    private token: SharedtokenService,
    private authState: AuthStateService,
    private metaService: Meta
  ) { 
    
    this.profile = this.formBuilder.group(
      {
     
      loginForm : this.formBuilder.group({
      email: ['', Validators.required], 
      password: ['', Validators.required]}),
    
    
      registerform : this.formBuilder.group({
      email : ['',Validators.required],
      password: [''],
      dateofbirth: [''],
      firstname: ['', Validators.minLength(4)],
      lastname: [''],
      province: [''],
      code: [''],
      city: ['']
    })

  });

  }

  get _email(): any {
    return this.registerform.get('email');
  }

  ngOnInit() {
    this.GetProvinces()
  }


  async onSubmit() {
    (await this.authService.returnClients()).subscribe(
        result => {
          this.responseHandler(result);
        
        // iterating through password
        for (let index = 0; index < result.length; index++) {
              if (this.profile.value.loginForm.email == result[index].email || this.profile.value.loginForm.password == result[index].password) {
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

         if((this.profile.value.loginForm.email == this.email) && (this.profile.value.loginForm.email != '') && (this.profile.value.loginForm.password == this.password))
          {
            this.authState.setAuthState(true);
            this.profile.reset();
            this.router.navigate(['/home']);

          }else{
            if ((this.profile.value.loginForm.email == '' || this.profile.value.loginForm.email !== this.email )){
              this.errors = 'Please enter a correct email address'
            }
            else{
              this.errors = 'Please enter a correct password'
            }
          }
        },
     );
     //console.log(this.profile.value.loginForm);
      
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
    (await this.authService.signup(this.profile.value.registerform)).subscribe((user: any ) => {let data = user})

    if (this.profile.value.registerform != null) {
      alert("Congratulations you have successfully registered.")
    } 
    
    //console.log(this.profile.value.registerform);
    this.profile.reset()
    

  }

  async GetProvinces(){
    (await this.authService.returnProvinces()).subscribe((data => (this.provinces = data)))
  }
  
}
