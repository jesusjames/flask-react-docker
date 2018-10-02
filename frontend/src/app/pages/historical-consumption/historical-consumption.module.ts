import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HistoricalConsumptionComponent} from "./historical-consumption.component";
import {HistoricalConsumptionRoutingModule} from "./historical-consumption-routing.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    HistoricalConsumptionRoutingModule,
    SharedModule
  ],
  declarations: [
    HistoricalConsumptionComponent
  ]
})
export class HistoricalConsumptionModule { }
