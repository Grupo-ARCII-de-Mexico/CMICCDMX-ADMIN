import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';
import { OportunidadNegocio } from '../interfaces/negocio.interface';

export interface Negocio {
    id: number,
    empresa:string;
    logotipo:string;
    documentos:any[];
    especialidades:any[];
    convocatoria:string;
    documento:string;
    identificador:string;
    oportunidadNegocio:OportunidadNegocio[]
    active?:boolean
}

export const store = createStore({ name: 'negocio' }, withEntities<Negocio>());


@Injectable({ providedIn: 'root' })
export class NegocioRepository {

    constructor(
    ) { }

    negocio$ = store.pipe(selectAllEntities());

    setNegocio(negocio: Negocio[]) {
        store.update(setEntities(negocio));
    }

    addNegocio(negocio: Negocio) {
        store.update(addEntities(negocio));
    }

    updateNegocio(id: Negocio['id'], negocio: Partial<Negocio>) {
        store.update(updateEntities(id, negocio));
    }

    deleteNegocio(id: Negocio['id']) {
        store.update(deleteEntities(id));
    }

}