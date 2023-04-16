import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { SalesReport, StocksReport } from 'src/app/models/Report';
import { RequestItems } from 'src/app/models/Request';
import { environment } from 'src/environments/environment';
import { ItemsService } from '../items/items.service';
import { Inventory } from 'src/app/models/Inventory';
import { VendorsService } from '../vendors/vendors.service';
import { Vendors } from 'src/app/models/Vendor';
import { RequestsService } from '../requests/requests.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private isReportStateChanged$$ = new BehaviorSubject<boolean>(false);
  public isReportStateChanged$ = this.isReportStateChanged$$.asObservable();


  requestStateManagement: RequestItems = {
    request: [],
    isLoading: true,
    errorMessage: '',
  };
  salesReportManagement!: SalesReport;
  stocksReportManagement!: StocksReport;

  totalSales!: number;

  authorizationToken: string = '';

  constructor(private requests_service: RequestsService) {
    this.requests_service.isRequestStateChanged$.subscribe(_ => {
      this.requestStateManagement = this.requests_service.getStoredRequestStateManagement();
    })
  }

}
