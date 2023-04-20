import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inventory } from 'src/app/models/Inventory';
import { Request, RequestItems } from 'src/app/models/Request';
import { ItemsService } from 'src/app/services/items/items.service';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { VendorsService } from 'src/app/services/vendors/vendors.service';
import { Vendors } from 'src/app/models/Vendor';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requestStateManagement!: RequestItems;
  newRequest!: FormGroup;
  requests!: any;
  requestId: any;
  editRequest!: Request;
  itemsArray!: FormArray;

  inventoryStateManagement!: Inventory;
  vendorStateManagement!: Vendors;
  selectedItems: any[] = [];

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'itemId',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    defaultOpen: false,
  };

  constructor(private formBuilder: FormBuilder, 
    private requests_service: RequestsService, 
    private items_service: ItemsService, 
    private vendors_service: VendorsService,
    private zone: NgZone) {
    this.newRequest = this.formBuilder.group({
      vendor: this.formBuilder.control('', [Validators.required]),
      requestId: this.formBuilder.control(''),
    });
    this.vendors_service.triggerGetAllVendorsOnInitialLoad();
    this.requests_service.triggerGetAllRequestsOnInitialLoad();
  }

  ngOnInit(): void {
    this.requests_service.isRequestStateChanged$.subscribe(_ => {
      this.requestStateManagement = this.requests_service.getStoredRequestStateManagement();
    })
    this.items_service.isStateChanged$.subscribe(_ => {
      this.inventoryStateManagement = this.items_service.getStoredInventoryStateManagement();
    })
    this.vendors_service.isVendorStateChanged$.subscribe(_ => {
      this.vendorStateManagement = this.vendors_service.getStoredVendorStateManagement();
    })
  }

  onItemSelect(item: any) {
    this.selectedItems.push(item);
    console.log(this.selectedItems);
  }

  onSelectAll(items: any) {
    this.selectedItems = [];
    this.selectedItems.push([... items]);
    console.log(this.selectedItems);
  }

  get form() {
    return this.newRequest.controls;
  }

  onAddRequest(): void {    
    const form = {
      request: this.newRequest.value,
      items: this.inventoryStateManagement.items.filter(itemDetail =>
        this.selectedItems.some(item => item.itemId === itemDetail.itemId)
      ),
    }
    if (this.requestId) {
      if (this.validateForm() && this.newRequest.value.requestId != "") {
        console.log(form);
        this.requests_service.editRequest(form);
        this.newRequest.reset();
      }
    }
    else {
      if (this.validateForm()) {
        console.log(form);
        this.requests_service.createRequest(form);
        this.selectedItems = [];
        this.newRequest.reset();
      } else {
        alert("Please Enter all the fields to create a request");
      }
    }
  }

  onEditRequest(id: any): void {
    this.requestId = id;
    console.log(this.requestId);
    this.editRequest = this.requestStateManagement.request.filter((request) => request.requestId == this.requestId)[0];
    console.log(this.editRequest);

    this.newRequest.patchValue(
      {
        requestId: this.editRequest.requestId,
        vendor: this.editRequest.vendorId,
      },
      {
        emitEvent: true
      }
    )

    this.zone.run(() => {
        this.selectedItems = [...this.editRequest.items];
    });
    
  }

  validateForm(): boolean {
    if (this.selectedItems.length > 0 && this.newRequest.value.vendor != "") {
      return true;
    }
    return false;
  }

  onDeleteRequest(requestId: any) {
    const confirmation = "Are you sure to delete the request?"
    if (confirm(confirmation) == true) {
      this.requests_service.deleteRequest(requestId);
    }
  }

  searchForVendor(vendorId: number): String {
    let vendorName = ""
    this.vendorStateManagement.vendors.forEach(vendor => {
      if(vendor.vendorId == vendorId) {
        vendorName = vendor.firstName;
      }
    })
    return vendorName;
  }

}
