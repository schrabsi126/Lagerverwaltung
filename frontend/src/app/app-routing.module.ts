import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }   from './login/login.component';
import { RegisterComponent }   from './register/register.component';
import { PublicGuard, ProtectedGuard } from 'ngx-auth';
import {ShowUserComponent} from './show-user/show-user.component';
import {ShowComponentsComponent} from './show-components/show-components.component';
import {AddEntryComponent} from './add-entry/add-entry.component';
import {AddDeliveryComponent} from './add-delivery/add-delivery.component';
import {ShowSingleComponentComponent} from './show-single-component/show-single-component.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user',
    pathMatch: 'full'
  },
  {
    path: 'user',
    canActivate: [ ProtectedGuard ],
    component: ShowUserComponent
  },
  { path: 'login', canActivate: [ PublicGuard ], component: LoginComponent },
  { path: 'entry', canActivate: [ ProtectedGuard ], component: AddEntryComponent },
  { path: 'delivery', canActivate: [ ProtectedGuard ], component: AddDeliveryComponent },
  { path: 'components', canActivate: [ ProtectedGuard ], component: ShowComponentsComponent },
  { path: 'components/:id', canActivate: [ ProtectedGuard ], component: ShowSingleComponentComponent },
  { path: 'register', canActivate: [ ProtectedGuard ], component: RegisterComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/' } // catch any unfound routes and redirect to home page
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
