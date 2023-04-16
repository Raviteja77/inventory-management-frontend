import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Inventory } from 'src/app/models/Inventory';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private isStateChanged$$ = new BehaviorSubject<boolean>(false);
  public isStateChanged$ = this.isStateChanged$$.asObservable();

  inventoryStateManagement: Inventory = {
    items: [],
    isAllItemsLoading: true,
    errorMessage: ''
  }

  authorizationToken: string = '';

  constructor(private http: HttpClient, private auth_service: AuthService, private router: Router) {
    this.auth_service.isUserChanged$.subscribe(_ => {
      const userState = this.auth_service.getStoredUserStateManagement();
      this.authorizationToken = userState.token;
    })
  }

  updateInventoryStateManagement() {
    this.getAllItems().subscribe({
      next: (response: any) => {
      console.log(response);
      this.inventoryStateManagement.items = response;
      this.inventoryStateManagement.isAllItemsLoading = false;
      this.inventoryStateManagement.errorMessage = '';
      this.setInventoryStateManagement(this.inventoryStateManagement);
      this.isStateChanged$$.next(true);
    }, error: (error) => {
      console.log(error);
      this.inventoryStateManagement.items = []
      this.inventoryStateManagement.isAllItemsLoading = true;
      this.inventoryStateManagement.errorMessage = 'Error in fetching items';
      this.setInventoryStateManagement(this.inventoryStateManagement);
      this.isStateChanged$$.next(true);
    }});
  }

  triggerGetAllItemsOnInitialLoad() {
    // trigger API call and store in sessionStorage on initial load
    const storedList = sessionStorage.getItem('inventoryStateManagement');
    if (storedList) {
      this.inventoryStateManagement = JSON.parse(storedList);
    } else {
      this.updateInventoryStateManagement();
    }
  }

  setInventoryStateManagement(stateManagement: any) {
    sessionStorage.setItem('inventoryStateManagement', JSON.stringify(stateManagement));
  }

  getStoredInventoryStateManagement() {
    const storedList = sessionStorage.getItem('inventoryStateManagement');
    return storedList ? JSON.parse(storedList) : [];
  }

  getAllItems() {
    return this.http.get(environment.endpoints.allItems);
  }

  getItem(itemId: string) {
    return this.http.get(`${environment.endpoints.item}/${itemId}`);
  }

  createItem(form: any) {
    return this.http.post(`${environment.endpoints.addItem}`, {
      name: form.item.itemName,
      description: form.item.description,
      purchasePrice: form.item.purchasePrice,
      salesPrice: form.item.salesPrice,
      itemThreshold: form.item.itemThreshold,
      expirationDate: form.item.expirationDate,
      quantity: form.item.quantity,
      soldQuantity: form.item.soldQuantity,
      vendorId: form.item.vendorId,
      status: true
    },
    {
      headers: { Authorization: this.authorizationToken },
    }).subscribe({
      next: (response: any) => {
        this.updateInventoryStateManagement();
        console.log(response);
        this.router.navigate(['/items']);
      }
    })
  }

  editItem(form: any) {
    return this.http.put(`${environment.endpoints.item}/${form.item.itemId}`, {
      name: form.item.itemName,
      description: form.item.description,
      purchasePrice: form.item.purchasePrice,
      salesPrice: form.item.salesPrice,
      itemThreshold: form.item.itemThreshold,
      expirationDate: form.item.expirationDate,
      quantity: form.item.quantity,
      soldQuantity: form.item.soldQuantity,
      itemId: form.item.itemId
    },
    {
      headers: { Authorization: this.authorizationToken },
    }).subscribe({
      next: (response: any) => {
        this.updateInventoryStateManagement();
        console.log(response);
        this.router.navigate(['/items']);
      }
    })
  }

  deleteItem(itemId: string) {
    return this.http.post(`${environment.endpoints.item}/${itemId}`, {
      headers: { Authorization: this.authorizationToken },
    }).subscribe({
      next: (response: any) => {
        this.updateInventoryStateManagement();
        console.log(response);
      }
    })
  }
}
