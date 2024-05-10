import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';


export interface Licitacion {
    id: number,

    procedimiento: string;

    portal: string;

    noProcedimiento: string;

    unidadCompradora: string;

    descripcionExpediente: string;

    fechaPublicacion: Date

    fechaLimiteBases: Date

    fechaapertura: Date

    fallo: Date

    vigencia: boolean

    link: string
    active: boolean
    updatedAt: Date
    createdAt: Date
}

export const store = createStore({ name: 'licitacion' }, withEntities<Licitacion>());


@Injectable({ providedIn: 'root' })
export class LicitacionRepository {

    constructor(
    ) { }

    licitaciones$ = store.pipe(selectAllEntities());

    setLicitacion(Licitacion: Licitacion[]) {
        store.update(setEntities(Licitacion));
    }

    addLicitacion(Licitacion: Licitacion) {
        store.update(addEntities(Licitacion));
    }

    updateLicitacion(id: Licitacion['id'], Licitacion: Partial<Licitacion>) {
        store.update(updateEntities(id, Licitacion));
    }

    deleteLicitacion(id: Licitacion['id']) {
        store.update(deleteEntities(id));
    }

}