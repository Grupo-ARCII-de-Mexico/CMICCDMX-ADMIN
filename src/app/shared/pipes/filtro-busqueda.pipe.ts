import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearch'
})
export class FiltroBusquedaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
      if(!arg ){
        return value
      }

      if(value  ){
        for(const post of value){
          if(post?.paypal?.identifier.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1){
            resultPosts.push(post);
          }
        }
      }

    return resultPosts;
  }

}
