import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Vendors, Vendor } from 'src/app/models/Vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  private isVendorStateChanged$$ = new BehaviorSubject<boolean>(false);
  public isVendorStateChanged$ = this.isVendorStateChanged$$.asObservable();

  vendorStateManagement: Vendors = {
    vendors: [],
    isAllVendorsLoading: true,
    errorMessage: ''
  }

  authorizationToken: string = '';

  constructor(private http: HttpClient, private auth_service: AuthService) {
    this.auth_service.isUserChanged$.subscribe(_ => {
      const userState = this.auth_service.getStoredUserStateManagement();
      this.authorizationToken = userState.token;
    })
  }

  updateVendorStateManagement() {
    this.getAllVendors().subscribe({
      next: (response: any) => {
      console.log(response);
      this.vendorStateManagement.vendors = response;
      this.vendorStateManagement.isAllVendorsLoading = false;
      this.vendorStateManagement.errorMessage = '';
      this.setVendorStateManagement(this.vendorStateManagement);
      this.isVendorStateChanged$$.next(true);
    }, error: (error) => {
      console.log(error);
      this.vendorStateManagement.vendors = []
      this.vendorStateManagement.isAllVendorsLoading = true;
      this.vendorStateManagement.errorMessage = 'Error in fetching vendors';
      this.setVendorStateManagement(this.vendorStateManagement);
      this.isVendorStateChanged$$.next(true);
    }});
  }

  triggerGetAllVendorsOnInitialLoad() {
    // trigger API call and store in sessionStorage on initial load
    const storedList = sessionStorage.getItem('vendorStateManagement');
    if (storedList) {
      this.vendorStateManagement = JSON.parse(storedList);
    } else {
      this.updateVendorStateManagement();
    }
  }

  setVendorStateManagement(stateManagement: any) {
    sessionStorage.setItem('vendorStateManagement', JSON.stringify(stateManagement));
  }

  getStoredVendorStateManagement() {
    const storedList = sessionStorage.getItem('vendorStateManagement');
    return storedList ? JSON.parse(storedList) : [];
  }

  getAllVendors() {
    return this.http.get(environment.endpoints.allVendors);
  }

  getVendor(vendorId: string) {
    return this.http.get(`${environment.endpoints.vendor}/${vendorId}`);
  }

  createVendor(form: any) {
    return this.http.post(`${environment.endpoints.addVendor}`, {
      firstName: form.vendor.firstName,
      lastName: form.vendor.lastName,
      mobile: form.vendor.mobile,
      email: form.vendor.email,
      status: true,
    },
    {
      headers: { Authorization: this.authorizationToken },
    }).subscribe({
      next: (response: any) => {
        if(response === 201) {
          this.updateVendorStateManagement();
        } else if(response === 208) {
          alert("Vendor email already exists!!!")
        }
        console.log(response);
      }
    })
  }

  editVendor(form: any) {
    return this.http.put(`${environment.endpoints.vendor}/${form.vendor.vendorId}`, {
      firstName: form.vendor.firstName,
      lastName: form.vendor.lastName,
      mobile: form.vendor.mobile,
      email: form.vendor.email,
      vendorId: form.vendor.vendorId,
    },
    {
      headers: { Authorization: this.authorizationToken },
    }).subscribe({
      next: (response: any) => {
        this.updateVendorStateManagement();
        console.log(response);
      }
    })
  }

  deleteVendor(vendorId: string) {
    return this.http.post(`${environment.endpoints.vendor}/${vendorId}`, {
      headers: { Authorization: this.authorizationToken },
    }).subscribe({
      next: (response: any) => {
        this.updateVendorStateManagement();
        console.log(response);
      }
    })
  }
}
