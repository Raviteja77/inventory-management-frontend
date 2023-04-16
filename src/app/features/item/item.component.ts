import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { buttonText } from '../../shared/constants';
import { ItemsService } from 'src/app/services/items/items.service';
import { Item } from 'src/app/models/Inventory';
import { VendorsService } from 'src/app/services/vendors/vendors.service';
import { Vendors } from 'src/app/models/Vendor';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  itemId: string = '';
  item!: Item;
  isLoading: boolean = true;

  vendorStateManagement!: Vendors;

  buttonText = buttonText;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private items_service: ItemsService,
    private vendors_service: VendorsService,
  ) {
    this.activatedRoute.params.subscribe((data) => {
      this.itemId = data['id'];
    });
    this.items_service.getItem(this.itemId).subscribe({
      next: (response) => {
        this.item = response as Item;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = true;
        console.log(error);
      }
    })
    this.vendors_service.triggerGetAllVendorsOnInitialLoad();
    this.vendors_service.isVendorStateChanged$.subscribe(_ => {
      this.vendorStateManagement = this.vendors_service.getStoredVendorStateManagement();
    })
  }

  goBack(): void {
    this.router.navigate(['/items']);
  }

  searchForVendor(vendorId: number): string {
    let vendorName = "";
    if(this.vendorStateManagement.vendors != null && this.vendorStateManagement.vendors.length != 0) {
    this.vendorStateManagement.vendors.forEach(vendor => {
      console.log("find the vendor", vendor.firstName, vendor.vendorId, vendorId);
      if(vendor.vendorId == vendorId){
        
        vendorName = vendor.firstName;
      }
    })
  }
    return vendorName;
  }

}
