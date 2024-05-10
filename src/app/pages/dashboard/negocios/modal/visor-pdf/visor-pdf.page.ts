import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-visor-pdf',
  templateUrl: './visor-pdf.page.html',
  styleUrls: ['./visor-pdf.page.scss'],
})
export class VisorPdfPage implements OnInit {

  @Input() titulo:string='JUAN'
  @Input() pdf!:string
  uri = environment.image+'oportunidades-documentos/'
  constructor(
    public modalc:ModalController
  ) { }

  ngOnInit() {

  }

}
