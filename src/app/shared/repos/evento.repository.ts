import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';

export interface Evento {
    id:number
    fechaInicio:Date;
    imagen:string;
    fechaFin:Date;
    titulo:string;
    detalles:string;
    pasarelasPago:string[];
    publicos:string[];
    costos:any;
    esGratis:boolean;
    lugar:string;
    tieneCupoMaximo:boolean;
    cupo:number;
    zoom:string
    zoomPassword:string
    mapLat:number
    mapLong:number
    tipoEvento:number;
    identificador:string;
    active:boolean;
    updatedAt:Date;
    createdAt:Date;
    boletos?:any;
    logotipo:string;
    agenda:any[];
    ponentes:any[];
    modal:any;
    hayPrensa?:boolean;
}

export const store = createStore({ name: 'user' }, withEntities<Evento>());


@Injectable({ providedIn: 'root' })
export class EventoRepository {
    evento$ = store.pipe(selectAllEntities());

    setEventos(eventos: Evento[]) {
        store.update(setEntities(eventos));
    }

    addEvento(evento: Evento) {
        store.update(addEntities(evento));
    }


    updateEvento(id: Evento['id'], user: Partial<Evento>) {
        store.update(updateEntities(id, user));
    }

    deleteEvento(id: Evento['id']) {
        store.update(deleteEntities(id));
    }
}


export enum TipoEvento { 
    PRESENCIAL=0,
    HIBRIDO=1,
    VIRTUAL=2
}