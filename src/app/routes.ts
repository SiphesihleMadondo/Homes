import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { DetailsComponent } from './details/details.component'
import { ApplicationComponent } from './application/application.component'
import { RouterNotFoundComponent } from './router-not-found/router-not-found.component'

const routeConfig: Routes = [
  { 
    path: '', 
    redirectTo: '/home', 
    pathMatch: 'full' 
  
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details',
    
  },

  {
    path: 'application/:id',
    component: ApplicationComponent,
    title: 'Application details'
  },

  { path: '**', 
    component: RouterNotFoundComponent 
  }
]

export default routeConfig
