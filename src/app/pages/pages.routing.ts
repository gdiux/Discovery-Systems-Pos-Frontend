import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// COMPONENTS
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientesComponent } from './clientes/clientes.component';
import { VentasComponent } from './ventas/ventas.component';

const routes: Routes = [
    
    { 
        path: 'dashboard', 
        component: PagesComponent,
        children: [
    
          { path: '', component: DashboardComponent },
          { path: 'clientes', component: ClientesComponent },
          { path: 'ventas', component: VentasComponent },
          
    
        ]
      },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
