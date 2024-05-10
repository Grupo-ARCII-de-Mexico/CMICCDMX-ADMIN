import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Afiliado, AfiliadoRepository } from 'src/app/shared/repos/afiliado.repository';


moment.locale('es');
@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.page.html',
  styleUrls: ['./afiliados.page.scss'],
})
export class AfiliadosPage implements OnInit {
  afiliados:Afiliado[]=[];
  afiliadosSelected:Afiliado[]=[];
  search!:string;
  divisor = 15;
  pagina= 0 
  constructor(
    private afiliadosRepo:AfiliadoRepository
  ) { }

  ngOnInit() {
    this.afiliadosRepo.user$.subscribe( afiliados => {
      this.afiliados = afiliados;
      this.afiliadosSelected = afiliados;
    });
  }
openModal:boolean = false;
afiliadoModal!:Afiliado

getPagina(pagina:number){
  this.pagina= pagina
    this.afiliadosSelected = this.afiliados.slice((pagina)*this.divisor,(pagina+1)*this.divisor)
 }

mon(date: Date): string {
  if (!date) {
    return 'No registrado';
  }

  const now = moment();
  const nextBirthday = moment(date, "YYYY-MM-DD").year(now.year());

  if (now.isAfter(nextBirthday)) {
    nextBirthday.add(1, 'year');
  }

  return nextBirthday.fromNow();
}
formatDate(date: Date): string {
  return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
}
isBirthdayToday(date: string): boolean {
  const today = moment();
  const birthday = moment(date, "YYYY-MM-DD");
  return today.isSame(birthday, 'day');
}
}
