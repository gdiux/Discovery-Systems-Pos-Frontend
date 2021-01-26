import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { delay, map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor( private http: HttpClient ) { }
  
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

  search(
      tipo: 'users'|'clients' |'departments'|'products',
      termino: string
    ){

    const endPoint = `/search/${tipo}/${termino}`;
    return this.http.get<any[]>(`${base_url}${endPoint}`, this.headers)
            .pipe(
              delay(500),
              map( (resp: any) => {              
                return resp;
              })
            );
  }


}
