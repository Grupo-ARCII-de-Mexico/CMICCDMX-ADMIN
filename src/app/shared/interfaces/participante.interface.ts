export interface Participante {
    id:number;
    nombre:string;
    telefono:string;
    email:string;
    rfc:string;
    curp:string;
    cargo:string;
    organizacion:string;
    empresa:string;
    numAfiliado:string;
    evidencia:string;
    estado:any
    active:boolean;
    updatedAt:Date
    createdAt:Date;
    delegacion:string;
    tipo: number;
}