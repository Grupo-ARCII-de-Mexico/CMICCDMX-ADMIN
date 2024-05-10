import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';

export interface Comentario {
    id:number
    puntuacion:number
    persona:string;
    empresa:string;
    imagen:string;
    texto:string;
}

export const store = createStore({ name: 'comentario' }, withEntities<Comentario>());


@Injectable({ providedIn: 'root' })
export class ComentarioRepository {
    comentario$ = store.pipe(selectAllEntities());

    setComentarios(comentarios: Comentario[]) {
        store.update(setEntities(comentarios));
    }

    addComentario(comentario: Comentario) {
        store.update(addEntities(comentario));
    }


    updateComentario(id: Comentario['id'], user: Partial<Comentario>) {
        store.update(updateEntities(id, user));
    }

    deleteComentario(id: Comentario['id']) {
        store.update(deleteEntities(id));
    }
}
