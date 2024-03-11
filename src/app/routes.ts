import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { DetailsComponent } from './details/details.component'
import { ApplicationComponent } from './application/application.component'
import { RouterNotFoundComponent } from './router-not-found/router-not-found.component'
import { LoginComponent } from './login/login.component'

const routeConfig: Routes = [
  { 
    path: '', 
    redirectTo: '/login', 
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

  {
    path: 'login',
    component: LoginComponent,
    title: 'login'
  },

  { path: '**', 
    component: RouterNotFoundComponent 
  }
]

export default routeConfig
