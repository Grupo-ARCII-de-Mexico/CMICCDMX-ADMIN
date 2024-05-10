import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';

export interface Comisiones {
    id:number
    imagen:string;
    texto:string;
    url:string;
}

export const store = createStore({ name: 'comisiones' }, withEntities<Comisiones>());


@Injectable({ providedIn: 'root' })
export class ComisionesRepository {
    comisiones$ = store.pipe(selectAllEntities());

    setComisioness(comisiones: Comisiones[]) {
        store.update(setEntities(comisiones));
    }

    addComisiones(comisiones: Comisiones) {
        store.update(addEntities(comisiones));
    }


    updateComisiones(id: Comisiones['id'], user: Partial<Comisiones>) {
        store.update(updateEntities(id, user));
    }

    deleteComisiones(id: Comisiones['id']) {
        store.update(deleteEntities(id));
    }
}
