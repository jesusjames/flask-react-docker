import { Component, OnInit } from '@angular/core';
import { HistoricalConsumption } from "../../models/historical-consumption.model";
import { HistoricalConsumptionService } from "../../services/historical-consumption/historical-consumption.service";

@Component({
  selector: 'app-historical-consumption',
  templateUrl: './historical-consumption.component.html',
  styleUrls: ['./historical-consumption.component.css']
})
export class HistoricalConsumptionComponent implements OnInit {

  public Historical: HistoricalConsumption[] = [];
  private HistoricalConsumptionModel: HistoricalConsumption;

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
          console.log(this.Historical);
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

  Action(data:HistoricalConsumption){
    this.HistoricalConsumptionModel = data;
    console.log("DESDE el PADRE--->");
    console.log(this.HistoricalConsumptionModel);
 }


}
