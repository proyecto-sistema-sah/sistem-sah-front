import { ITipoUsuario } from "./ITipoUsuario";

export class Usuario {

    public codigoUsuario?:string = '';

    public nombresUsuario?: string = '';

    public apellidosUsuario?: string = '';

    public correoUsuario?:string = '';

    public codigoImagenUsuario?:string = '';

    public contrasena?:string = '';

    public tipoUsuarioDtoFk?:ITipoUsuario | null = null;
}