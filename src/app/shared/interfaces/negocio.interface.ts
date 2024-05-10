
export interface ContactoNegocio {
    id:number;
    nombre:string;
    paterno:string;
    materno:string;
    telefono:string;
    telefonoOficina:string;
    email:string;
}


export interface OportunidadNegocio {
    id:number;
    web:string;
    empresa:string;
    documentos:any[];
    afiliado:string;
    denominacion:string;
    rfc:string;
    estado:string;
    municipio:string;
    calle:string;
    colonia:string;
    cp:number;
    especialidades:any[];
    contacto:ContactoNegocio;
}