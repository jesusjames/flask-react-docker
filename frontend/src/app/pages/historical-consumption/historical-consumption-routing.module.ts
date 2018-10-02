import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";
import { HistoricalConsumptionComponent } from "./historical-consumption.component";

const routes: Routes = [
    { path: '', component: HistoricalConsumptionComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ], exports:[
    RouterModule
  ],
  declarations: []
})
export class HistoricalConsumptionRoutingModule { }
