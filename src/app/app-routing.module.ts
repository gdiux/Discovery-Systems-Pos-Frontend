import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { VentasComponent } from './pages/ventas/ventas.component';

const routes: Routes = [

  { 
    path: '', 
    component: PagesComponent,
    children: [

      { path: 'dashboard', component: DashboardComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'ventas', component: VentasComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

    ]
  },

  { path: 'login', component: LoginComponent },

  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
