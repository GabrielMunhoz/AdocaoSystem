import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, ParamMap } from '@angular/router';
import { AdocaoComponent } from './adocao/adocao.component';
import { InformacoesAdocaoComponent } from './adocao/informacoes-adocao/informacoes-adocao.component';
import { AuthGuard } from './helpers/AuthGuard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AssociaEnderecoComponent } from './pessoas/associa-endereco/associa-endereco.component';
import { FormEnderecoComponent } from './pessoas/form-endereco/form-endereco.component';
import { FormPessoasComponent } from './pessoas/form-pessoas/form-pessoas.component';
import { InformacoesEnderecoComponent } from './pessoas/informacoes-endereco/informacoes-endereco.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { FormPetsComponent } from './pets/form-pets/form-pets.component';
import { PetsComponent } from './pets/pets.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent ,canActivate: [AuthGuard]},
  { path: 'pets', component: PetsComponent ,canActivate: [AuthGuard]},
  { path: 'pessoa', component: PessoasComponent ,canActivate: [AuthGuard]},
  { path: 'pets/edit/:id', component: FormPetsComponent ,canActivate: [AuthGuard]},
  { path: 'pets/inserir', component: FormPetsComponent ,canActivate: [AuthGuard]},
  { path: 'pessoa/inserir', component: FormPessoasComponent ,canActivate: [AuthGuard]},
  { path: 'pessoa/informacao/endereco/:id', component: InformacoesEnderecoComponent ,canActivate: [AuthGuard]},
  { path: 'pessoa/editar/endereco/:id', component: FormEnderecoComponent ,canActivate: [AuthGuard]},
  { path: 'pessoa/associar/endereco', component: AssociaEnderecoComponent ,canActivate: [AuthGuard]},
  { path: 'pessoa/editar/endereco', component: FormEnderecoComponent ,canActivate: [AuthGuard]},
  { path: 'pessoa/edit/:id', component: FormPessoasComponent ,canActivate: [AuthGuard]},
  { path: 'adocao/informacoes/:id', component: AdocaoComponent ,canActivate: [AuthGuard]},
  { path: 'adocao/informacoes', component: InformacoesAdocaoComponent ,canActivate: [AuthGuard]},
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
