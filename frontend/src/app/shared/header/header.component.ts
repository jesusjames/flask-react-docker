import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../services/usuario/usuario.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _UsuarioService: UsuarioService) { }

  ngOnInit() {
  }

  salir() {
    this._UsuarioService.logout();
  }

}
