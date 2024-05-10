import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';
import { Participante } from '../interfaces/participante.interface';

export interface Boletos {
    id:number
    folio:string;
    qr:string;
    costo:number;
    privilegio:string;
    participante:Participante;
    idPago:string  | null;
    plataformaPago:number;
    quieroFactura:boolean;
    active:boolean;
    createdAt:Date;
}

export const store = createStore({ name: 'user' }, withEntities<Boletos>());


@Injectable({ providedIn: 'root' })
export class BoletosRepository {
    evento$ = store.pipe(selectAllEntities());

    setEventos(eventos: Boletos[]) {
        store.update(setEntities(eventos));
    }

    addEvento(evento: Boletos) {
        store.update(addEntities(evento));
    }

    updateEvento(id: Boletos['id'], user: Partial<Boletos>) {
        store.update(updateEntities(id, user));
    }

    deleteEvento(id: Boletos['id']) {
        store.update(deleteEntities(id));
    }
}


export enum TipoEvento { 
    PRESENCIAL=0,
    HIBRIDO=1,
    VIRTUAL=2
}