import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../services/usuario/usuario.service";
import {Usuario} from "../../models/usuario.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;

  constructor(private _UsuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this._UsuarioService.usuario;
  }

  salir() {
    this._UsuarioService.logout();
  }

}
