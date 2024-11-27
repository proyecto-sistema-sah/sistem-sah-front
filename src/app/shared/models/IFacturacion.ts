import { ReservaCuarto } from "./ReservaCuarto"

export interface IFacturacion{
    codigoFacturacion:string
    fechaCreacionFacturacion:string
    urlPdf:string
    codigoReservaDtoFk:ReservaCuarto
    estadoFacturacion:string
}