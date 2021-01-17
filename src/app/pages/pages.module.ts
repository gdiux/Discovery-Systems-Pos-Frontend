import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

// COMPONENTS
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VentasComponent } from './ventas/ventas.component';
import { ClientesComponent } from './clientes/clientes.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    VentasComponent,
    ClientesComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    VentasComponent,
    ClientesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class PagesModule { }
