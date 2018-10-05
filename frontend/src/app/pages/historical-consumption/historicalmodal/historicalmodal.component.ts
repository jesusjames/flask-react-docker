import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { HistoricalConsumption } from "../../../models/historical-consumption.model";


@Component({
  selector: 'app-historicalmodal',
  templateUrl: './historicalmodal.component.html',
  styleUrls: ['./historicalmodal.component.css']
})
export class HistoricalmodalComponent implements OnInit {
  @Input() action: string = '';
  @Input() historical: any = {};
  @Output() passData:EventEmitter<Object> = new EventEmitter();

  closeResult: string;
  private modal: any;
  public createHistorical: HistoricalConsumption;
  public historicalview: HistoricalConsumption;

  constructor(private modalService: NgbModal) {
    this.createHistorical = {
      paciente: "",
      edad: 0,
      sexo: "",
      procedimiento: "",
      producto: "",
      cantidad: 0
    };
  }

  open(content) {
    this.modal = this.modalService.open(content, {windowClass: 'animated fadeInDown faster'});
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  setValues(){
    this.passData.emit(this.createHistorical);
    this.modal.close();
    this.createHistorical = {
      paciente: "",
      edad: 0,
      sexo: "",
      procedimiento: "",
      producto: "",
      cantidad: 0
    };
  }

  ngOnInit(): void {
    this.historicalview = this.historical;
    if(this.action === 'edit') {
      this.createHistorical = this.historical;
    }
  }

}
