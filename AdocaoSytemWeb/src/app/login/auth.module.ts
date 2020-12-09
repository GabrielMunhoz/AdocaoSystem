import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
  ]
})
export class AuthModule {}