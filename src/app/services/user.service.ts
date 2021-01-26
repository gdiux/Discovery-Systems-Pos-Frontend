import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

// INTERFACE
import { LoginForm } from '../interfaces/login-form.interface';

// ENVIRONMENT
import { environment } from '../../environments/environment';

// MODELS
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;

  constructor( private http: HttpClient,
                private router: Router ) { }

  /** ================================================================
   *   LOGOUT
  ==================================================================== */
  logout(){
    
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');

  }

  /** ================================================================
   *   VALIDATE TOKEN OR RENEW TOKEN
  ==================================================================== */
  validateToken():Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        
        const { usuario, name, role, img, uid } = resp.usuario;

        this.user = new User( usuario, name, '', role, img, uid );

        localStorage.setItem('token', resp.token);
      }),
      map( resp => true ),
      catchError( error => of(false) )
    );

  }

  /** ================================================================
   *   CREATE USER
  ==================================================================== */
  createUser( formData: any ){

    const token = localStorage.getItem('token') || '';
    
    return this.http.post(`${base_url}/users`, formData, {
      headers: {
        'x-token': token
      }
    });

  }

  /** ================================================================
   *  LOGIN
  ==================================================================== */
  login( formData: LoginForm ){
    
    return this.http.post(`${base_url}/login`, formData)
                      .pipe(
                        tap( (resp: any) => {
                          localStorage.setItem('token', resp.token);                        
                        })
                      );
  }

}
