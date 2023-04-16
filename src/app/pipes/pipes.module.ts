import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveItemsPipe } from './active-items/active-items.pipe';
import { ActiveVendorsPipe } from './active-vendors/active-vendors.pipe';
import { SearchFilterPipe } from './search-filter/search-filter.pipe';
import { VendorsNamePipe } from './vendors-name/vendors-name.pipe';

const listOfPipes: any = [
  ActiveItemsPipe,
  ActiveVendorsPipe,
  SearchFilterPipe,
  VendorsNamePipe
];

@NgModule({
  declarations: [listOfPipes],
  imports: [
    CommonModule
  ],
  exports: [listOfPipes]
})
export class PipesModule { }
