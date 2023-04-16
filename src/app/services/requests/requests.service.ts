import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { RequestItems } from 'src/app/models/Request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private isRequestStateChanged$$ = new BehaviorSubject<boolean>(false);
  public isRequestStateChanged$ = this.isRequestStateChanged$$.asObservable();

  requestStateManagement: RequestItems = {
    request: [],
    isLoading: true,
    errorMessage: '',
  };

  authorizationToken: string = '';

  constructor(private http: HttpClient, private auth_service: AuthService) {
    this.auth_service.isUserChanged$.subscribe(_ => {
      const userState = this.auth_service.getStoredUserStateManagement();
      this.authorizationToken = userState.token;
    })
  }

  updateRequestStateManagement() {
    this.getAllRequests().subscribe({
      next: (response: any) => {
      console.log(response);
      this.requestStateManagement.request = response;
      this.requestStateManagement.isLoading = false;
      this.requestStateManagement.errorMessage = '';
      this.setRequestStateManagement(this.requestStateManagement);
      this.isRequestStateChanged$$.next(true);
    }, error: (error) => {
      console.log(error);
      this.requestStateManagement.request = []
      this.requestStateManagement.isLoading = true;
      this.requestStateManagement.errorMessage = 'Error in fetching items';
      this.setRequestStateManagement(this.requestStateManagement);
      this.isRequestStateChanged$$.next(true);
    }});
  }

  triggerGetAllRequestsOnInitialLoad() {
    // trigger API call and store in sessionStorage on initial load
    const storedList = sessionStorage.getItem('requestStateManagement');
    if (storedList) {
      this.requestStateManagement = JSON.parse(storedList);
    } else {
      this.updateRequestStateManagement();
    }
  }

  setRequestStateManagement(stateManagement: any) {
    sessionStorage.setItem('requestStateManagement', JSON.stringify(stateManagement));
  }

  getStoredRequestStateManagement() {
    const storedList = sessionStorage.getItem('requestStateManagement');
    return storedList ? JSON.parse(storedList) : [];
  }

  getAllRequests() {
    return this.http.get(environment.endpoints.allRequests);
  }

  getRequest(requestId: string) {
    return this.http.get(`${environment.endpoints.request}/${requestId}`);
  }

  createRequest(form: any) {
    console.log("service", form.request.vendor);
    
    return this.http.post(`${environment.endpoints.addRequest}`, {
      dateOfRequest: new Date().toUTCString().slice(5, 16),
      vendorId: form.request.vendor,
      items: form.items,
      status: true
    },
    {
      headers: { Authorization: this.authorizationToken },
    }).subscribe({
      next: (response: any) => {
        this.updateRequestStateManagement();
        console.log(response);
      }
    })
  }

  editRequest(form: any) {
    return this.http.put(`${environment.endpoints.request}/${form.request.requestId}`, {
      requestId: form.request.requestId,
      vendor_id: form.request.vendor.vendorId,
      items: form.request.items,
    },
    {
      headers: { Authorization: this.authorizationToken },
    }).subscribe({
      next: (response: any) => {
        this.updateRequestStateManagement();
        console.log(response);
      }
    })
  }

  deleteRequest(requestId: string) {
    return this.http.post(`${environment.endpoints.request}/${requestId}`, {
      headers: { Authorization: this.authorizationToken },
    }).subscribe({
      next: (response: any) => {
        this.updateRequestStateManagement();
        console.log(response);
      }
    })
  }
}
