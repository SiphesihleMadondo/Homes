import { Injectable } from '@angular/core';
import { Housinglocation } from './housinglocation';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Applicant } from '../applicant';

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
  
  private removeParentheses(url: string): string {
    const regex = /(\(|\))/g;
    const encodedString = url.replace(regex, (match) => {
        if (match === '(') {
            return '%28'; // URL-encoded version of "("
        } else {
            return '%29'; // URL-encoded version of ")"
        }
    });
    return encodedString;
}

  /*these functions return either a specific HousingLocation by id or the entire list*/ 
  async getAllHOusingLocations(): Promise<Housinglocation[]>{
    const data = await fetch(this.url)
    return (await data.json()) ?? [];
  }
  
  async getHousingLocationById(id: number): Promise<Housinglocation | undefined> {
    const data = await fetch(`${this.removeParentheses(this.url)}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string, phonenumber: string){
      console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}, phoneNumber: ${phonenumber}.`);
  }
  

  async createApplication(applicant: any): Promise<Observable<Applicant>>{
    return this.http.post<any>(this.backendUrl + 'api/Homes/CreateApplicant', applicant, this.httpOptions);

  }
  
} 
