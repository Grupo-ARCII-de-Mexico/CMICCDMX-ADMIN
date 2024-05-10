import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';

export interface Calendario {
    id:number
    texto:string;
    archivo:string;
    tipo:number;
    updatedAt:Date
}

export const store = createStore({ name: 'calendario' }, withEntities<Calendario>());


@Injectable({ providedIn: 'root' })
export class CalendarioRepository {
    calendario$ = store.pipe(selectAllEntities());

    setCalendarios(calendarios: Calendario[]) {
        store.update(setEntities(calendarios));
    }

    addCalendario(calendario: Calendario) {
        store.update(addEntities(calendario));
    }


    updateCalendario(id: Calendario['id'], user: Partial<Calendario>) {
        store.update(updateEntities(id, user));
    }

    deleteCalendario(id: Calendario['id']) {
        store.update(deleteEntities(id));
    }
}
