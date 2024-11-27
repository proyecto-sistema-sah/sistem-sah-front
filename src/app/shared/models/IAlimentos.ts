import { ITipoAlimento } from "./ITipoalimento";

export interface IAlimentos{

    codigoAlimento:string;
    tiempoPreparacionAlimento:string;
    nombreAlimento:string;
    detalleAlimento:string;
    codigoImagen:string;
    tipoAlimentoDtoFk:ITipoAlimento

}