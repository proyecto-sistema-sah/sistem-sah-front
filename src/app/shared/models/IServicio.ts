import { ITipoServicio } from "./ITipoServicio";

export interface IServicio{

    codigoServicio:string;

    nombreServicio:string;

    valorServicio:number;

    codigoImagenServicio:string;

    detalleServicio:string;

    tipoServicioDtoFk:ITipoServicio

}