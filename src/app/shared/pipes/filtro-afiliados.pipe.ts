import { Pipe, PipeTransform } from '@angular/core';
import { eliminarObjetosRepetidos } from '../tools/filtrarRepetidos';

@Pipe({
  name: 'afiliadoSearch'
})
export class FiltroAfiliadoPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
      if(!arg ){
        return value
      }
      if(value  ){
        for(const post of value){
          if(post?.nombre?.toLowerCase().indexOf(arg.toLowerCase()) > -1){
            resultPosts.push(post);
          }
          if(post?.representanteLegal?.toLowerCase().indexOf(arg.toLowerCase()) > -1){
            resultPosts.push(post);
          }
          if(post?.registro?.toLowerCase().indexOf(arg.toLowerCase()) > -1){
            resultPosts.push(post);
          }
        
        }
      }

    return eliminarObjetosRepetidos(resultPosts);
  }

}
