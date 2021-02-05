import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// GUARD
import { AuthGuard } from '../guards/auth.guard';

// COMPONENTS
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientesComponent } from './clientes/clientes.component';
import { VentasComponent } from './ventas/ventas.component';
import { ProductosComponent } from './productos/productos.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ComprasComponent } from './compras/compras.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { FacturasComponent } from './facturas/facturas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProductoComponent } from './productos/producto.component';
import { CajaComponent } from './configuracion/caja/caja.component';
import { UsuariosComponent } from './configuracion/usuarios/usuarios.component';


const routes: Routes = [
    
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
    
          { path: '', component: DashboardComponent, data:{ titulo: 'Dashboard'} },
          { path: 'clientes', component: ClientesComponent, data:{ titulo: 'Clientes'} },
          { path: 'ventas', component: VentasComponent, data:{ titulo: 'Ventas'} },
          { path: 'inventario', component: InventarioComponent, data:{ titulo: 'Inventario'} },
          { path: 'compras', component: ComprasComponent, data:{ titulo: 'Compras'} },
          { path: 'configuracion', component: ConfiguracionComponent, data:{ titulo: 'Configuracion'} },
          { path: 'facturas', component: FacturasComponent, data:{ titulo: 'Facturas'} },
          { path: 'perfil', component: PerfilComponent, data:{ titulo: 'Perfil'} },
          { path: 'productos', component: ProductosComponent, data:{ titulo: 'Productos'} },
          { path: 'producto/:id', component: ProductoComponent, data:{ titulo: 'Producto'} },
          { path: 'configuracion/caja', component: CajaComponent, data:{ titulo: 'Caja' } },
          { path: 'configuracion/usuarios', component: UsuariosComponent, data:{ titulo: 'Usuarios' } }
              
        ]
      },    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
