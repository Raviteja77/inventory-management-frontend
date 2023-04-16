import { Component, OnInit } from '@angular/core';
import { Inventory, Item } from 'src/app/models/Inventory';
import { RequestItems } from 'src/app/models/Request';
import { Vendors } from 'src/app/models/Vendor';
import { ItemsService } from 'src/app/services/items/items.service';
import { VendorsService } from 'src/app/services/vendors/vendors.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{

  vendorStateManagement!: Vendors;
  itemStateManagement!: Inventory;

  constructor(private vendors_service: VendorsService,
    private items_service: ItemsService) { }

  ngOnInit(): void {
    this.vendors_service.isVendorStateChanged$.subscribe(_ => {
      this.vendorStateManagement = this.vendors_service.getStoredVendorStateManagement();
    })
    this.items_service.isStateChanged$.subscribe(_ => {
      this.itemStateManagement = this.items_service.getStoredInventoryStateManagement();
    })
  }

  searchForVendor(vendorId: number): string {
    let vendorName = "";
    this.vendorStateManagement.vendors.forEach(vendor => {
      if(vendor.vendorId == vendorId){
        vendorName = vendor.firstName;
      }
    })
    return vendorName;
  }

  calculateTotalSales(itemId: number): number {
    let totalSales = 0;
    this.itemStateManagement.items.forEach(item => {
      if(item.itemId == itemId) {
        totalSales = item.salesPrice * item.soldQuantity;
      }
    })
    return totalSales;
  }

  calculateTotalStocks(itemId: number): number {
    let totalStocks = 0;
    this.itemStateManagement.items.forEach(item => {
      if(item.itemId == itemId) {
        totalStocks = item.purchasePrice * item.quantity;
      }
    })
    return totalStocks;
  }

}