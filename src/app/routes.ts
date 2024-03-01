import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';
import { ApplicationComponent } from './application/application.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  },

  {
    path: 'application/:id',
    component: ApplicationComponent,
    title: 'Application details'
  }
];

export default routeConfig;