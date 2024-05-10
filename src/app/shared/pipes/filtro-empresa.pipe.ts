import { Pipe, PipeTransform } from '@angular/core';
import { eliminarObjetosRepetidos } from '../tools/filtrarRepetidos';

@Pipe({
  name: 'enterpriseSearch'
})
export class FiltroEmpresaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
      if(!arg ){
        return value
      }

      if(value  ){
        for(const post of value){
          if(post?.empresa?.toLowerCase().indexOf(arg.toLowerCase()) > -1){
            resultPosts.push(post);
          }
        
        }
      }

    return eliminarObjetosRepetidos(resultPosts);
  }

}
