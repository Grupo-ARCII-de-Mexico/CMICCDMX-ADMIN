import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Evento, EventoRepository } from 'src/app/shared/repos/evento.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { environment } from 'src/environments/environment';

import { ModalController, NavController } from '@ionic/angular';
import { UserPage } from '../user/user.page';
import { VerUsuariosPage } from './ver-usuarios/ver-usuarios.page';
import { BoletosRepository } from 'src/app/shared/repos/boletos.repository';
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  eventos:Evento[] = []

  constructor(
    private eventoRepo:EventoRepository,
  ) { }
 
  ngOnInit() {
    this.eventoRepo.evento$.pipe(
        tap( eventosSaved => this.eventos=eventosSaved )
    ).subscribe()
  }


}
