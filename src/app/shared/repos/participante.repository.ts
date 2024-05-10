

import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';
import { Participante } from '../interfaces/participante.interface';


export const store = createStore({ name: 'user' }, withEntities<Participante>());


@Injectable({ providedIn: 'root' })
export class ParticipanteRepository {
    evento$ = store.pipe(selectAllEntities());

    setEventos(eventos: Participante[]) {
        store.update(setEntities(eventos));
    }

    addEvento(evento: Participante) {
        store.update(addEntities(evento));
    }

    updateEvento(id: Participante['id'], user: Partial<Participante>) {
        store.update(updateEntities(id, user));
    }

    deleteEvento(id: Participante['id']) {
        store.update(deleteEntities(id));
    }
}


export enum TipoEvento { 
    PRESENCIAL=0,
    HIBRIDO=1,
    VIRTUAL=2
}