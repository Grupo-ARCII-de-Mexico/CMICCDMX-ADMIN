import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';

export interface Slider {
    id:number
    texto:string
    imagen:string
    uri:string
    button:string
    position:number
}

export const store = createStore({ name: 'slider' }, withEntities<Slider>());


@Injectable({ providedIn: 'root' })
export class SliderRepository {
    slider$ = store.pipe(selectAllEntities());

    setSliders(sliders: Slider[]) {
        store.update(setEntities(sliders));
    }

    addSlider(slider: Slider) {
        store.update(addEntities(slider));
    }


    updateSlider(id: Slider['id'], user: Partial<Slider>) {
        store.update(updateEntities(id, user));
    }

    deleteSlider(id: Slider['id']) {
        store.update(deleteEntities(id));
    }
}
