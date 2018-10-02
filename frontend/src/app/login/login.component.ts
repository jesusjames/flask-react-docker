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
  public error = '';
  public exito = '';

  constructor(private _usuarioService: UsuarioService,
              private _router: Router) {
    this.usuario = {
      email: "",
      name: null,
      password: ""
    }
  }

  ngOnInit() {
  }

  login(forma: NgForm){
    this.loading = true;

    if ( forma.invalid ) {
      return;
    }

    this._usuarioService.login(this.usuario).subscribe(
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
        this.error = 'Usuario o contraseña incorrectas';
      }
    );
  }

}
