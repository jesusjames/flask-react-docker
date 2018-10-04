import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricalConsumptionComponent } from "./historical-consumption.component";
import { HistoricalConsumptionRoutingModule } from "./historical-consumption-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { HistoricalmodalComponent } from './historicalmodal/historicalmodal.component';

@NgModule({
  imports: [
    CommonModule,
    HistoricalConsumptionRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    HistoricalConsumptionComponent,
    HistoricalmodalComponent
  ]
})
export class HistoricalConsumptionModule { }
