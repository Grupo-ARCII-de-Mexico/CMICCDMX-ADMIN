import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';

export interface Directorio {
    id:number
    nombre:string
    correo:string
    cargo:string
    departamento:Departamento
    updatedAt:Date
}

export interface Departamento{
    id:number
    nombre:string
    directorios:Directorio[]
}

export const store = createStore({ name: 'departamento' }, withEntities<Departamento>());


@Injectable({ providedIn: 'root' })
export class DepartamentoRepository {
    directorio$ = store.pipe(selectAllEntities());

    setDepartamento(directorios: Departamento[]) {
        store.update(setEntities(directorios));
    }

    addDepartamento(directorio: Departamento) {
        store.update(addEntities(directorio));
    }


    updateDepartamento(id: Departamento['id'], user: Partial<Departamento>) {
        store.update(updateEntities(id, user));
    }

    deleteDepartamento(id: Departamento['id']) {
        store.update(deleteEntities(id));
    }
}
