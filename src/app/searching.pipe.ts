import { Products } from './products';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searching',
})
export class SearchingPipe implements PipeTransform {
  transform(allProducts: Products[],searchQuery:string):Products[] {
    return allProducts.filter((e)=>{return  e.title.toLowerCase().includes(searchQuery.toLowerCase())})
  }
}
