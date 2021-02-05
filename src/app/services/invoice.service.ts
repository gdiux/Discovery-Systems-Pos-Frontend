import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { delay, map, tap } from 'rxjs/operators'

// INTERFACES
import { LoadInvoice } from '../interfaces/invoice.interface';

import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }
  
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
   *   CREATE INVOICE
  ==================================================================== */
  createInvoice(formData:any){
    
    return this.http.post(`${base_url}/invoice`, formData, this.headers);

  }

}
