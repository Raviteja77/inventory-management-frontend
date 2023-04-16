import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { buttonText } from '../../constants';
import { ItemsService } from 'src/app/services/items/items.service';
import { Item } from 'src/app/models/Inventory';
import { Vendors } from 'src/app/models/Vendor';
import { VendorsService } from 'src/app/services/vendors/vendors.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent {
  item!: FormGroup;
  itemIdData: any;
  editItem: any;
  buttonText = buttonText;
  isLoading: boolean = false;

  vendorStateManagement!: Vendors;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private items_service: ItemsService,
    private vendors_service: VendorsService
  ) {
    this.activatedRoute.params.subscribe((data: any) => {
      this.itemIdData = data;
    });
    this.vendors_service.isVendorStateChanged$.subscribe(_ => {
      this.vendorStateManagement = this.vendors_service.getStoredVendorStateManagement();
    })
    this.item = this.formBuilder.group({
      itemId: this.formBuilder.control(''),
      itemName: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control('', [Validators.required]),
      purchasePrice: this.formBuilder.control('', [Validators.required]),
      salesPrice: this.formBuilder.control('', [Validators.required]),
      itemThreshold: this.formBuilder.control('', [Validators.required]),
      expirationDate: this.formBuilder.control('', [Validators.required]),
      quantity: this.formBuilder.control('', [Validators.required]),
      soldQuantity: this.formBuilder.control('', [Validators.required]),
      vendorId: this.formBuilder.control('', [Validators.required])
    });

    if (this.itemIdData && this.itemIdData.id) {
      this.items_service.getItem(this.itemIdData.id).subscribe({
        next: (response) => {
          this.editItem = response as Item;
          this.isLoading = false;
          this.updateFormValues();
        },
        error: (error) => {
          this.isLoading = true;
          console.log(error);
        }
      })
    }
  }

  get form() {
    return this.item.controls;
  }

  updateFormValues(): void {
    if (!this.isLoading) {
      this.item.patchValue(
        {
          itemId: this.editItem.itemId,
          itemName: this.editItem.name,
          description: this.editItem.description,
          purchasePrice: this.editItem.purchasePrice,
          salesPrice: this.editItem.salesPrice,
          itemThreshold: this.editItem.itemThreshold,
          expirationDate: this.editItem.expirationDate,
          quantity: this.editItem.quantity,
          soldQuantity: this.editItem.soldQuantity,
          vendorId: this.editItem.vendorId,
        },
        { emitEvent: true }
      );
    }
  }

  submitForm(): void {
    const form = {
      item: this.item.value,
    }
    if (this.itemIdData && this.itemIdData.id) {
      if (this.validateForm() && this.item.value.itemId != "") {
        console.log(form);
        this.items_service.editItem(form);
      }
    } else {
      if (this.validateForm()) {
        console.log(form);
        this.items_service.createItem(form);
      } else {
        alert("Please Enter all the fields to create an Item");
      }
    }
  }

  validateForm(): boolean {
    if (this.item.value.itemName != "" && this.item.value.description != ""
      && this.item.value.purchasePrice != "" && this.item.value.salesPrice != ""
      && this.item.value.expirationDate != "" && this.item.value.itemThreshold != ""
      && this.item.value.quantity != "" && this.item.value.soldQuantity != ""
      && this.item.value.vendorId != "") {
      return true;
    }
    return false;
  }

  searchForVendor(vendorId: number): string {
    let vendorName = "";
    if (this.vendorStateManagement.vendors != null) {
      this.vendorStateManagement.vendors.forEach(vendor => {
        if (vendor.vendorId == vendorId) {
          vendorName = vendor.firstName;
        }
      })
    }
    return vendorName;
  }
}
