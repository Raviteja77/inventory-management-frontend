import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { buttonText } from '../../constants';
import { ItemsService } from 'src/app/services/items/items.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  @Input()
  itemList!: any;

  isAdmin!: boolean;

  @Output()
  emitEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  penIcon = faPen;

  trashIcon = faTrash;

  buttonText = buttonText;

  searchKey: string = '';

  deleteItemId: string = '';

  constructor(private items_service: ItemsService) {}

  ngOnInit(): void {}

  clickHandler(event: any): void {
    this.emitEvent.emit(event);
  }

  searchWord(event: any): void {
    this.searchKey = event;
  }

  deleteItem(itemId: string): void {
    
  }

  saveDeleteItemId(itemId: string): void {
    const confirmation = "Are you sure to delete the item?"
    if(confirm(confirmation) == true) {
      this.items_service.deleteItem(itemId);
    }
  }

}
