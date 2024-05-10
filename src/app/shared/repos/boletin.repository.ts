import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';

export interface Boletin {
    id:number
    titulo:string;
    autor:string;
    informacion:string;
    identificador:string;
    imagen:string;
    updatedAt:Date
    createdAt:Date
    imagenes:string[];
    fecha:Date
}

export const store = createStore({ name: 'boletin' }, withEntities<Boletin>());


@Injectable({ providedIn: 'root' })
export class BoletinRepository {
    boletin$ = store.pipe(selectAllEntities());

    setBoletins(boletins: Boletin[]) {
        store.update(setEntities(boletins));
    }

    addBoletin(boletin: Boletin) {
        store.update(addEntities(boletin));
    }


    updateBoletin(id: Boletin['id'], user: Partial<Boletin>) {
        store.update(updateEntities(id, user));
    }

    deleteBoletin(id: Boletin['id']) {
        store.update(deleteEntities(id));
    }
}
