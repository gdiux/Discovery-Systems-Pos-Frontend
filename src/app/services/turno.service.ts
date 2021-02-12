import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { delay, map, tap } from 'rxjs/operators'

// INTERFACE
import { LoadTurno } from '../interfaces/load-turno.interface';

import { environment } from '../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(  private http: HttpClient) { }

  /** ================================================================
   *   GET TOKEN
  ==================================================================== */
  get token():string {
    return localStorage.getItem('token') || '';
  }

  /** ================================================================
   *   GET HEADERS
  ==================================================================== */
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  /** ================================================================
   *  CREATE NEW TURNO
  ==================================================================== */
  createCaja(formData: any){
    
    return this.http.post(`${base_url}/turno`, formData, this.headers);

  }
  /** ================================================================
   *  GET TURNO ID
  ==================================================================== */
  getTurnoId(turno: string){
        
    return this.http.get<LoadTurno>(`${base_url}/turno/${turno}`, this.headers)
                .pipe(
                  map(resp => {
                    return resp;
                  })
                );
  }


  // FIN DE LA CLASE
}
