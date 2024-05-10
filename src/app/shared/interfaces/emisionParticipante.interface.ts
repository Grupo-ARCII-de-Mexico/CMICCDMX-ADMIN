import { TipoPublico } from "../enums/tipoPublico.enum"

export interface EmisionRegistroEvento {
    id:number
    tipo: TipoPublico
}