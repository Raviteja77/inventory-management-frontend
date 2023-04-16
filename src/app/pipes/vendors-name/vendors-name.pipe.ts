import { Pipe, PipeTransform } from '@angular/core';
import { VendorsService } from 'src/app/services/vendors/vendors.service';

@Pipe({
  name: 'vendorsName'
})
export class VendorsNamePipe implements PipeTransform {

  vendorsName: string[] = [];

  constructor(private vendors_service: VendorsService) {
    this.vendors_service.getAllVendors();
  }

  transform(vendorsId: string[]): unknown {
    // this.vendors_service.allVendors$.subscribe(data => {
    //   data.forEach((list: any) => {
    //     vendorsId.forEach(vendorId => {
    //       if(list.id === vendorId) {
    //         this.vendorsName.push(list.name);
    //       }
    //     })
    //   })
    // })
    return this.vendorsName;
  }

}
