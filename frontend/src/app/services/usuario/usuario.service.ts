import { Injectable } from '@angular/core';
import { Usuario } from "../../models/usuario.model";
import { Router } from "@angular/router";
import { GLOBAL } from '../global';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;
  private token: string;

  constructor(
    private _HttpClient: HttpClient,
    private router: Router
  ) {
    this.cargarStorage();
  }

  login(usuario: Usuario, recordar: boolean = false): Observable<any> {
    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    }else {
      localStorage.removeItem('email');
    }

    let urlApi =  GLOBAL.url + "auth";
    let body = {
	    email: usuario.email,
	    password: usuario.password
    };

    return this._HttpClient.post(urlApi, body)
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

}
