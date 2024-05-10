import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  Uri=environment.uri
  constructor(
    private http:HttpClient,
   
  ){}
    gravatar(email:string) {
      return this.http.head("https://www.gravatar.com/avatar/"+email+"?d=404", { observe: 'response' }).pipe(
        catchError((error) => {
          // Si hay un error al cargar la URL del Gravatar, provoca un error personalizado
          return throwError('No se encontró el Gravatar asociado a este correo electrónico.');
        })
      );
    }
    getOne<T>(ruta:string,id:number|string){
      return this.http.get<T>(this.Uri+ruta+'/'+id)
    }
    getAll<T>(ruta:string,){
      return this.http.get<T>(this.Uri+ruta)
    }
    get<T>(ruta:string,){
      return this.http.get<T>(ruta)
    }
    delete(ruta:string,id:number){
      return this.http.delete(this.Uri+ruta+'/'+id)
    }
    update<T>(ruta:string,id:number,data:any){
      return this.http.patch<T>(this.Uri+ruta+'/'+id,data)
    }
    updateToken<T>(ruta:string,data:any){
      return this.http.patch<T>(this.Uri+ruta,data)
    }
    updateWhitImage<T>(ruta:string,id:number,data:FormData){
      return this.http.patch<T>(this.Uri+ruta+'/'+id,data)
    }
    post<T>(ruta:string,data:any){
      return this.http.post<T>(this.Uri+ruta,data)
    }
    placeGoogleMaps(query:string){
      const apiUrl = 'https://places.googleapis.com/v1/places:searchText';
      const headers = new HttpHeaders({
        'X-Goog-Api-Key':environment.map,
        'X-Goog-FieldMask':'*'
      })
      return this.http.post(apiUrl,{textQuery:query},{headers});
    }


}
