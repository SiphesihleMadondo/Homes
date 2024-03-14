import { Injectable } from '@angular/core';
import { Housinglocation } from './housinglocation';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Applicant } from './applicant';
import { User } from './user';
import { Provinces } from './provinces';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  url = 'http://localhost:3000/locations';
  backendUrl = 'http://localhost:5176/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(protected http: HttpClient) { }
  
  /*these functions return either a specific HousingLocation by id or the entire list*/ 
  async getAllHOusingLocations(): Promise<Housinglocation[]>{
    const data = await fetch(this.url)
    return (await data.json()) ?? [];
  }
  
  async getHousingLocationById(id: number): Promise<Housinglocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string, phonenumber: string){
      console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}, phoneNumber: ${phonenumber}.`);
  }
  

  async createApplication(applicant: any): Promise<Observable<Applicant>>{
    return this.http.post<any>(this.backendUrl + 'api/Homes/CreateApplicant', applicant, this.httpOptions);

  }

  async returnClients() {
    return this.http.get<any>(this.backendUrl + 'api/Homes/GetUsers');
  }

  async returnProvinces(): Promise<Observable<Provinces>>{
      return this.http.get<any>(this.backendUrl + 'api/Homes/GetProvinces')
  }

  signin(user: any): Observable<any> {
    console.log(this.url + `/Checkuser/${user}`)
    return this.http.get<any>(this.backendUrl + `/Checkuser/${user}`, this.httpOptions)
  }

  async signup(user: any): Promise<Observable<User>>{
    return this.http.post<any>(this.backendUrl + 'api/Homes/SignUp', user, this.httpOptions);
  }
  
} 
