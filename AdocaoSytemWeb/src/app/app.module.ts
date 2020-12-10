import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './Service/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './helpers/AuthGuard';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { getBaseUrl } from 'src/main';
import { AuthInterceptor } from './helpers/Auth.Interceptor';
import { PetsComponent } from './pets/pets.component';
import { FormPetsComponent } from './pets/form-pets/form-pets.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { FormPessoasComponent } from './pessoas/form-pessoas/form-pessoas.component';
import { AdocaoComponent } from './adocao/adocao.component';
import { InformacoesAdocaoComponent } from './adocao/informacoes-adocao/informacoes-adocao.component';
import { IdadeCachorroPipe } from './pipes/idade-cachorro.pipe';
import { FiltroAdotadosPipe } from './pipes/filtro-adotados.pipe';
import { FormEnderecoComponent } from './pessoas/form-endereco/form-endereco.component';
import { InformacoesEnderecoComponent } from './pessoas/informacoes-endereco/informacoes-endereco.component';
import { AssociaEnderecoComponent } from './pessoas/associa-endereco/associa-endereco.component';

@NgModule({
  declarations: [
    AppComponent,
    NavmenuComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavmenuComponent,
    PetsComponent,
    FormPetsComponent,
    PessoasComponent,
    FormPessoasComponent,
    AdocaoComponent,
    InformacoesAdocaoComponent,
    IdadeCachorroPipe,
    FiltroAdotadosPipe,
    FormEnderecoComponent,
    InformacoesEnderecoComponent,
    AssociaEnderecoComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthService,AuthGuard,
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true   
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
