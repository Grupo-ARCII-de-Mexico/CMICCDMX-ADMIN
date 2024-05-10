import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';
import { ToastService } from '../tools/toast.service';
import { AlertService } from '../tools/alert.service';
import { NavController } from '@ionic/angular';

export interface Auth {
    id: number,
    names: string;
    foto?: string;
    phone?: string;
    user?: string;
    email?: string;
    password: string;
    role: number;
    gravatar:boolean;
    active: boolean;
    updatedAt: Date;
    createdAt: Date;
}

export const store = createStore({ name: 'user' }, withEntities<Auth>());


@Injectable({ providedIn: 'root' })
export class AuthRepository {

    constructor(
        private toast: ToastService,
        private alert: AlertService,
        private nav:NavController
    ) { }

    user$ = store.pipe(selectAllEntities());

    setUser(user: Auth[]) {
        store.update(setEntities(user));
    }

    addUser(user: Auth) {
        store.update(addEntities(user));
    }

    updateUser(id: Auth['id'], user: Partial<Auth>) {
        store.update(updateEntities(id, user));
    }

    deleteUser(id: Auth['id']) {
        store.update(deleteEntities(id));
    }

    async logout() {
        await this.alert.setData({
            animated: true,
            header:'Cerrar Sesión',
            message:'Para cerrar sesión confirme',
            buttons: [{
                text: 'Cancelar'
            },
            {
                text: 'Cerrar Sesión',
                handler: async () => {
                    this.toast.setData({
                        duration: 3000,
                        color: 'success',
                        message: '¡Vuelva pronto!'
                    });
                    await this.toast.create();
                    await this.toast.show();
                    localStorage.clear();
                    store.reset();
                    this.nav.navigateForward('/website');
                }
            }]
        });

    }
}