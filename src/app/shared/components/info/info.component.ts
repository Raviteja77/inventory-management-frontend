import { Component, Input, OnInit } from '@angular/core';
import { Vendors } from 'src/app/models/Vendor';
import { VendorsService } from 'src/app/services/vendors/vendors.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  @Input()
  title!: string;

  @Input()
  text: string = '';

  vendorStateManagement!: Vendors

  constructor(private vendors_service: VendorsService) {
    this.vendors_service.isVendorStateChanged$.subscribe(_ => {
      this.vendorStateManagement = this.vendors_service.getStoredVendorStateManagement();
    })
   }

  ngOnInit(): void {
  }

}