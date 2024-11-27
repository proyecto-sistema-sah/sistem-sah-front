import { ISafeAny } from "./ISafeAny";

export class IResponse {
    public message: string = '';
    public status:string = '';
    public data: ISafeAny;
}