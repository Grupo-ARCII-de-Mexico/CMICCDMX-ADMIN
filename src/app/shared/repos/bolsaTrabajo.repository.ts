import { Injectable } from "@angular/core";
import { createStore } from "@ngneat/elf";
import { addEntities, deleteEntities, selectAllEntities, setEntities, updateEntities, withEntities } from "@ngneat/elf-entities";

export interface BolsaTrabajo {
    id:number
    foto:string;
    descripcion:string,
    titulo:string
    espacio:string
    tipoContratacion:string
    vigencia:Date
    estado:string,
    municipio:string,
    delegacion:string,
    mostrarSalario:boolean
    puestoDeseado:string,
    escolaridad:string,
    edad:string,
    estadoCivil:string,
    salario:string,
    tareas:string,
    prestaciones:string,
    active: boolean
    updatedAt: Date
    createdAt: Date,
    postulantes:any
    identificador:string;
}


export const store = createStore({ name: 'BolsaTrabajo' }, withEntities<BolsaTrabajo>());


@Injectable({ providedIn: 'root' })
export class BolsaTrabajoRepository {

    constructor(
    ) { }

    BolsaTrabajo$ = store.pipe(selectAllEntities());

    setBolsaTrabajo(BolsaTrabajo: BolsaTrabajo[]) {
        store.update(setEntities(BolsaTrabajo));
    }

    addBolsaTrabajo(BolsaTrabajo: BolsaTrabajo) {
        store.update(addEntities(BolsaTrabajo));
    }

    updateBolsaTrabajo(id: BolsaTrabajo['id'], BolsaTrabajo: Partial<BolsaTrabajo>) {
        store.update(updateEntities(id, BolsaTrabajo));
    }

    deleteBolsaTrabajo(id: BolsaTrabajo['id']) {
        store.update(deleteEntities(id));
    }

}