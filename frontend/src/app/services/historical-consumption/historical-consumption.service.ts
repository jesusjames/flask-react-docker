import { Injectable } from '@angular/core';
import {GLOBAL} from "../global";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsuarioService } from "../usuario/usuario.service";
import { Observable } from "rxjs";
import { HistoricalConsumption } from "../../models/historical-consumption.model";

@Injectable({
  providedIn: 'root'
})
export class HistoricalConsumptionService {

  private urlApi = GLOBAL.url + '/api/v1/historical_consumption';

  constructor(
    private _HttpClient: HttpClient,
    private _UsuarioService: UsuarioService
  ) { }

  cargarHistoricalConsumption(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._UsuarioService.getToken());
    return this._HttpClient.get( this.urlApi, {headers});
  }

  createHistoricalCosnumption(historical: HistoricalConsumption): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._UsuarioService.getToken());
    let body = historical;
    return this._HttpClient.post(this.urlApi, body, {headers});
  }

  editHistoricalCosnumption(historical: HistoricalConsumption): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + this._UsuarioService.getToken());
    let copia = {...historical};
    let body = historical;
    delete body._id;
    console.log(body);
    return this._HttpClient.put(this.urlApi + '/' + copia._id, body, {headers});
  }

  deleteHistoricalCosnumption(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._UsuarioService.getToken());
    let body = id;
    return this._HttpClient.delete(this.urlApi + '/' + id, {headers});
  }

}
