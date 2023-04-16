import { Pipe, PipeTransform } from '@angular/core';
import { Item } from 'src/app/models/Inventory';

@Pipe({
  name: 'activeItems'
})
export class ActiveItemsPipe implements PipeTransform {

  transform(items: Item[]): boolean {
    let result = [];
    for(let i = 0; i < items?.length; i++) {
      if(items[i].status)
        result.push(items[i]);
    }
    return result.length != 0;
  }

}
