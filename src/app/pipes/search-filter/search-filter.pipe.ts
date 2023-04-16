import { Pipe, PipeTransform } from '@angular/core';
import { Item } from 'src/app/models/Inventory';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: Item[], searchWord: string): any [] {
    let result = [];
    if(items?.length != 0 && searchWord === '') {
      return items;
    }
    for(let i = 0; i < items?.length; i++) {
      if(items[i].name.toLowerCase().includes(searchWord.toLowerCase()))
        result.push(items[i]);
    }
    return result;
  }

}