import { Injectable } from '@angular/core';
import { Housinglocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor() { }

  url = 'http://localhost:3000/locations';
  

  //creating a single instance of the new interface in the component


  /*these functions return either a specific HousingLocation by id or the entire list*/ 
  async getAllHOusingLocations(): Promise<Housinglocation[]>{
    const data = await fetch(this.url)
    return (await data.json()) ?? [];
  }
  
  async getHousingLocationById(id: number): Promise<Housinglocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string){
      console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }
  
  
} 
