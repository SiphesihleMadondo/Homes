import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStateService } from '../auth-state.service';
import { SharedtokenService } from '../sharedtoken.service';
import { HousingService } from '../housing.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


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
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors:any = null;
  results: any [] = []
  email?: string 
  password?:string
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: HousingService,
    private token: SharedtokenService,
    private authState: AuthStateService
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: [],
    });
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
            if ((this.loginForm.value.email == '' || this.loginForm.value.email !== this.email)){
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
      console.log("button clicked.")
  }
  // Handle response
  responseHandler(data:any) {
    this.token.handleData(data.access_token);
    sessionStorage.setItem('loggedUser', data.user);
    sessionStorage.setItem('User_Id', data.user_id);
    sessionStorage.setItem('Client', data.client);
  }
}
