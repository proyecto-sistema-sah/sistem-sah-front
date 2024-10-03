import { ISafeAny } from "./ISafeAny";

export class IResponse {
    public mensaje: string = '';
    public status:string = '';
    public data: ISafeAny;
}