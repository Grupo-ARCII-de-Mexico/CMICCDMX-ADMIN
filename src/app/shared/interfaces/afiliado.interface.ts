import { Delegacion } from "./delegacion.interface";

export interface Afiliado { 
    id:number;
    delegacion:Delegacion;
    nombre:string;
    telefono:string;
    email:string;
    rfc:string;
    cargo:string;
    active:boolean;
    updatedAt:Date
    createdAt:Date
}