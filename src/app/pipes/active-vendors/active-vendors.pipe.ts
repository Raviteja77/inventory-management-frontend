import { Pipe, PipeTransform } from '@angular/core';
import { Vendor } from 'src/app/models/Vendor';

@Pipe({
  name: 'activeVendors'
})
export class ActiveVendorsPipe implements PipeTransform {

  transform(vendors: Vendor[]): boolean {
    let result = [];
    if (vendors != null) {
      for (let i = 0; i < vendors?.length; i++) {
        if (vendors[i].status)
          result.push(vendors[i]);
      }
    }
    return result.length != 0;
  }

}
