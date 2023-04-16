import { Component, OnInit } from '@angular/core';
import { buttonText } from '../../shared/constants';
import { ItemsService } from 'src/app/services/items/items.service';
import { Inventory } from 'src/app/models/Inventory';
import { Vendors } from 'src/app/models/Vendor';
import { VendorsService } from 'src/app/services/vendors/vendors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  inventoryStateManagement!: Inventory;
  vendorStateManagement!: Vendors;

  buttonText = buttonText;

  constructor(private items_service: ItemsService, private vendors_service: VendorsService, private router: Router) {
    this.items_service.triggerGetAllItemsOnInitialLoad();
    this.vendors_service.triggerGetAllVendorsOnInitialLoad();
  }

  ngOnInit(): void {
    this.items_service.isStateChanged$.subscribe(_ => {
      this.inventoryStateManagement = this.items_service.getStoredInventoryStateManagement();
    })
    this.vendors_service.isVendorStateChanged$.subscribe(_ => {
      this.vendorStateManagement = this.vendors_service.getStoredVendorStateManagement();
    })
  }

  handleRoute() {
    if(this.vendorStateManagement.vendors != null && this.vendorStateManagement.vendors.length > 0) {
      this.router.navigate(['/items/add']);
    } else {
      this.router.navigate(['/vendors']);
    }
  }

}
