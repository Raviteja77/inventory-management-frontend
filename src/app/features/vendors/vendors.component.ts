import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vendor, Vendors } from 'src/app/models/Vendor';
import { VendorsService } from 'src/app/services/vendors/vendors.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  vendorStateManagement!: Vendors;
  newVendor!: FormGroup;
  vendors!: any;
  vendorId: any;
  editVendor!: Vendor;

  constructor(private formBuilder: FormBuilder, private vendor_service: VendorsService) {
    this.newVendor = this.formBuilder.group({
      firstName: this.formBuilder.control('', [Validators.required]),
      lastName: this.formBuilder.control('', [Validators.required]),
      mobile: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required]),
      vendorId: this.formBuilder.control(''),
    });

    this.vendor_service.triggerGetAllVendorsOnInitialLoad();
  }

  ngOnInit(): void {
    this.vendor_service.isVendorStateChanged$.subscribe(_ => {
      this.vendorStateManagement = this.vendor_service.getStoredVendorStateManagement();
    })
  }

  get form() {
    return this.newVendor.controls;
  }

  onAddVendor(): void {
    const form = {
      vendor: this.newVendor.value,
    }
    if(this.vendorId) {
      if(this.validateForm() && this.newVendor.value.vendorId != "") {
        console.log(form);
        this.vendor_service.editVendor(form);
        this.newVendor.reset();
      }
    }
    else {
      if (this.validateForm()) {
        console.log(form);
        this.vendor_service.createVendor(form);
        this.newVendor.reset();
      } else {
        alert("Please Enter all the fields to add a vendor");
      }
    }
  }

  onEditVendor(id: any): void {
    this.vendorId = id;
    console.log(this.vendorId);
    this.editVendor = this.vendorStateManagement.vendors.filter((vendor) => vendor.vendorId == this.vendorId)[0];
    console.log(this.editVendor);
    
    this.newVendor.patchValue(
      {
        vendorId: this.editVendor.vendorId,
        firstName: this.editVendor.firstName,
        lastName: this.editVendor.lastName,
        mobile: this.editVendor.mobile,
        email: this.editVendor.email,
      },
      {
        emitEvent: true
      }
    )
  }

  validateForm(): boolean {
    if (this.newVendor.value.firstName != "" && this.newVendor.value.lastName != ""
      && this.newVendor.value.mobile != "" && this.newVendor.value.email != "") {
      return true;
    }
    return false;
  }

  onDeleteVendor(vendorId: any) {
    const confirmation = "Are you sure to delete the vendor?"
    if(confirm(confirmation) == true) {
      this.vendor_service.deleteVendor(vendorId);
    }
  }

}
