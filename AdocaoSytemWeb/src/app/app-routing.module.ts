import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthGuard } from './helpers/AuthGuard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormPetsComponent } from './pets/form-pets/form-pets.component';
import { PetsComponent } from './pets/pets.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent ,canActivate: [AuthGuard]},
  { path: 'pets', component: PetsComponent ,canActivate: [AuthGuard]},
  { path: 'pets/edit/:id', component: FormPetsComponent ,canActivate: [AuthGuard]},
  { path: 'pets/inserir', component: FormPetsComponent ,canActivate: [AuthGuard]},
  { path: '',   redirectTo: '/home', pathMatch: 'full' ,canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule implements OnInit {

  name : string;

  constructor(private route: ActivatedRoute,) {


  }
  ngOnInit(): void {
    
  }

}
