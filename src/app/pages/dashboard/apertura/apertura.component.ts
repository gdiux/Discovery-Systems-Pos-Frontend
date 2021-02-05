import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

// SERVICES
import { CajaService } from '../../../services/caja.service';

// INTERFACES
import { _caja } from '../../../interfaces/load-caja.interface';

@Component({
  selector: 'app-apertura',
  templateUrl: './apertura.component.html',
  styles: [
  ]
})
export class AperturaComponent implements OnInit {

  public listaCaja: _caja[] = [];

  constructor(  private cajaService: CajaService) { }

  ngOnInit(): void {
    
    this.cargarCajas();

  }

  /** ================================================================
   *   CARGAR CAJAS
  ==================================================================== */
  cargarCajas(){
    
    this.cajaService.loadCajas()
        .subscribe( ({ total, cajas }) => {
          
          this.listaCaja = cajas;


        }, (err) => { Swal.fire('Error', err.error.msg, 'error'); });

  }

}
