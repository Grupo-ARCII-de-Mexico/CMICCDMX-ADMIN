import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';


export interface Apoyos {
    id: number,
    imagen:string;
    descripcion:string;
    titulo:string;
    identificador:string;
    apoyos:any[]
}

export const store = createStore({ name: 'user' }, withEntities<Apoyos>());


@Injectable({ providedIn: 'root' })
export class ApoyosRepository {

    user$ = store.pipe(selectAllEntities());

    setApoyos(user: Apoyos[]) {
        store.update(setEntities(user));
    }

    addApoyo(user: Apoyos) {
        store.update(addEntities(user));
    }

    updateApoyo(id: Apoyos['id'], user: Partial<Apoyos>) {
        store.update(updateEntities(id, user));
    }

    deleteApoyo(id: Apoyos['id']) {
        store.update(deleteEntities(id));
    }

}