import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'paginador',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
  standalone:true,
  imports:[IonicModule, CommonModule]
})
export class TablaComponent  implements OnInit, OnChanges {

  @Input() total:number = 54;
  @Input() divisor:number =10;
  @Output() pagina: EventEmitter<number> = new EventEmitter<number>();
  array:any
  constructor() { }
  selected:any = [];
  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {

    this.array = Array(Math.ceil(this.total / this.divisor));
    this.selected = Array(Math.ceil(this.total / this.divisor)).fill(false)
    this.selected[0]=true 
    console.log(this.array.length);
    
  }

  paginaActual = 0;

  selectPagina(pag:number){
    this.selected = this.selected.map( (a:any) => a = false);
    this.selected[pag] = true
    this.pagina.emit(pag)
    this.paginaActual=pag;
  }

  alert(){
    alert('asd')
  }

}
