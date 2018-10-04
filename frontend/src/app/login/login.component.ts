import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { UsuarioService } from "../services/usuario/usuario.service";
import { Usuario } from "../models/usuario.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: Usuario;
  public loading = false;
  public recuerdame: boolean = false;
  public error = '';
  public exito = '';

  constructor(private _usuarioService: UsuarioService,
              private _router: Router) {
    this.usuario = {
      email: '',
      name: null,
      password: ''
    }
  }

  ngOnInit() {
    this.usuario.email = localStorage.getItem('email') || '';
    if ( this.usuario.email.length > 1 ) {
      this.recuerdame = true;
    }
  }

  login(){
    this.loading = true;

    this._usuarioService.login(this.usuario, this.recuerdame).subscribe(
      response => {
        this.loading = false;
        if (response) {
          this._usuarioService.guardarStorage(response.data[0].user._id, response.data[0].token, response.data[0].user);
          this.exito = 'Bienvenido, por favor espere...';
          this._router.navigate(['/historical-consumption']);
          return true;
        } else {
            this.error = 'Usuario o contraseña incorrectas';
          }
      },
      error => {
        console.log(error.error.message);
        this.error = error.error.message;
        this.loading = false;
      }
    );
  }

  restartNotification(){
    this.error = '';
  }

}
