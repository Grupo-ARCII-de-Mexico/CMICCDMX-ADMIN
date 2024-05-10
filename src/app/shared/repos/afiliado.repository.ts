import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';


export interface Afiliado {
    id: number,
    fechaEmision: Date;
    fechaFacturacion: Date;
    fechaPagoDelegacion: Date;
    registro: string;
    certificado: number;
    nip: number;
    inicioOperaciones: Date;
    nombre: string;
    cumpleanos: Date;
    representanteLegal: string;
    tamano: string;
    telefono1?: string;
    telefono2?: string;
    correo1?: string;
    correo2?: string;
    anosConsecutivos: number;
    ultimoAno: number;
    especialidad1?: string;
    especialidad2?: string;
    especialidad3?: string;
}

export const store = createStore({ name: 'user' }, withEntities<Afiliado>());


@Injectable({ providedIn: 'root' })
export class AfiliadoRepository {

    user$ = store.pipe(selectAllEntities());

    setAfiliado(user: Afiliado[]) {
        store.update(setEntities(user));
    }

    addAfiliado(user: Afiliado) {
        store.update(addEntities(user));
    }

    updateAfiliado(id: Afiliado['id'], user: Partial<Afiliado>) {
        store.update(updateEntities(id, user));
    }

    deleteAfiliado(id: Afiliado['id']) {
        store.update(deleteEntities(id));
    }

}