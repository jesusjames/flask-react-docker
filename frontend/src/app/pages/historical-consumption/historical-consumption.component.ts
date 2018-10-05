import { Component, OnInit } from '@angular/core';
import { HistoricalConsumption } from "../../models/historical-consumption.model";
import { HistoricalConsumptionService } from "../../services/historical-consumption/historical-consumption.service";
import swal from 'sweetalert';


@Component({
  selector: 'app-historical-consumption',
  templateUrl: './historical-consumption.component.html',
  styleUrls: ['./historical-consumption.component.css']
})
export class HistoricalConsumptionComponent implements OnInit {

  public Historical: HistoricalConsumption[] = [];
  public HistoricalConsumptionModel: HistoricalConsumption;

  constructor(
    private _HistoricalConsumptionService: HistoricalConsumptionService
  ) {
  }

  ngOnInit() {
    this.listHistoricalConsumption();
  }

  listHistoricalConsumption() {
    this._HistoricalConsumptionService.cargarHistoricalConsumption().subscribe(
      response => {
        if(response) {
          this.Historical = response.data;
          return true;
        }else{
          console.log("error listando data");
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  Action(data:HistoricalConsumption, action){
    this.HistoricalConsumptionModel = data;
    console.log("DESDE el PADRE--->");
    console.log(this.HistoricalConsumptionModel);
    switch (action) {
      case 'create':
        this.CreateHistoricalConsumption(this.HistoricalConsumptionModel);
        break;
      case 'edit':
        this.EditHistoricalConsumption(this.HistoricalConsumptionModel);
        break;
    }
 }

 CreateHistoricalConsumption(historical: HistoricalConsumption) {
    this._HistoricalConsumptionService.createHistoricalCosnumption(historical).subscribe(
      response => {
        if(response){
          swal('Historical consumption Creado', response.message, 'success');
          console.log(response);
          this.listHistoricalConsumption();
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
 }

 EditHistoricalConsumption(historical: HistoricalConsumption) {
    this._HistoricalConsumptionService.editHistoricalCosnumption(historical).subscribe(
      response => {
        if(response){
          swal('Historical consumption Editado', response.message, 'success');
          console.log(response);
          this.listHistoricalConsumption();
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
 }

 DeleteHistoricalConsumption(historical: HistoricalConsumption) {
    this._HistoricalConsumptionService.deleteHistoricalCosnumption(historical._id).subscribe(
      response => {
        if(response){
          swal('Historical consumption Eliminado', response.message, 'success');
          console.log(response);
          this.listHistoricalConsumption();
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
 }


}
