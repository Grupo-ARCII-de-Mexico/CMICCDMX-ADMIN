import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';

export interface Curso {
    id:number
    titulo:string
    informacion:string
    imagen:string
    precio:string
    identificador:string
    url:string
    updatedAt:Date
}

export const store = createStore({ name: 'curso' }, withEntities<Curso>());


@Injectable({ providedIn: 'root' })
export class CursoRepository {
    curso$ = store.pipe(selectAllEntities());

    setCursos(cursos: Curso[]) {
        store.update(setEntities(cursos));
    }

    addCurso(curso: Curso) {
        store.update(addEntities(curso));
    }


    updateCurso(id: Curso['id'], user: Partial<Curso>) {
        store.update(updateEntities(id, user));
    }

    deleteCurso(id: Curso['id']) {
        store.update(deleteEntities(id));
    }
}
