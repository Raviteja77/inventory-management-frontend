import { Component, Input, OnInit  } from '@angular/core';
import { VendorsService } from 'src/app/services/vendors/vendors.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input()
  item!: any;

  vendorsList!: any;
  isLoading: boolean = true;

  joiner: string = ', ';

  constructor(private vendor_service: VendorsService) {}

  ngOnInit(): void {}
}
