import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Esto proporcionará una única instancia global del servicio
})
export class HeaderStatusService {
  private booleanSubject = new BehaviorSubject<boolean>(true);
  booleanObservable$: Observable<boolean> = this.booleanSubject.asObservable();

  setBooleanStatus(event:any) {

    const scrollPosition = event.detail.currentY -50;
    const a = document.getElementById('subheader');
    if(scrollPosition > 100){
      this.booleanSubject.next(false);
    }else{
      this.booleanSubject.next(true);
    }
  }

  setValue(value:boolean){
    this.booleanSubject.next(value)
  }
}
