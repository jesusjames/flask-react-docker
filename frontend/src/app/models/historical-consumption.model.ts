export class HistoricalConsumption {
  constructor(
    public cantidad: number,
    public edad: number,
    public paciente: string,
    public procedimiento: string,
    public producto: string,
    public sexo?: string,
    public _id?: string,
  ) { }
}
