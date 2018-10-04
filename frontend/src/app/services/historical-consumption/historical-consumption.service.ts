import { Injectable } from '@angular/core';
import {GLOBAL} from "../global";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UsuarioService} from "../usuario/usuario.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistoricalConsumptionService {

  constructor(
    private _HttpClient: HttpClient,
    private _UsuarioService: UsuarioService
  ) { }

  cargarHistoricalConsumption(): Observable<any> {
    const urlApi = GLOBAL.url + '/api/v1/historical_consumption';
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._UsuarioService.getToken());
    return this._HttpClient.get( urlApi, { headers } );
  }

}
