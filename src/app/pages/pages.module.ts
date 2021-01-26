import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// COMPONENTS
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VentasComponent } from './ventas/ventas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ComprasComponent } from './compras/compras.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { FacturasComponent } from './facturas/facturas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProductoComponent } from './productos/producto.component';
import { NuevoComponent } from './productos/nuevo/nuevo.component';
import { DepartamentosComponent } from './productos/departamentos/departamentos.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    VentasComponent,
    ClientesComponent,
    ProductosComponent,
    InventarioComponent,
    ComprasComponent,
    ConfiguracionComponent,
    FacturasComponent,
    PerfilComponent,
    ProductoComponent,
    NuevoComponent,
    DepartamentosComponent
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
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
