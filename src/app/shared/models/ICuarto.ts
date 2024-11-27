import { EstadoCuarto } from "./IEstadoCuarto";
import { TipoCuarto } from "./ITipoCuarto";

export interface Cuarto{

    codigoCuarto:string;
    numeroCuarto:string;
    codigoImagenCuarto:string;
    valorNocheCuarto:number;
    detalleCuarto:string;
    estadoCuartoDtoFk:EstadoCuarto;
    tipoCuartoDtoFk:TipoCuarto;
    fechaInicio: string;// Nueva propiedad (ejemplo: "2024-12-01")
    fechaFin: string; // Nueva propiedad (ejemplo: "2024-12-10")
}