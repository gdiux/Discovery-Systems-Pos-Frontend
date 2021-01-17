import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { RouterModule } from '@angular/router';

// COMPONENTS
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AuthModule { }
