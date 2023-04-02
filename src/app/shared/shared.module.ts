import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

const listOfComponents: any = [
    HeaderComponent,
];

@NgModule({
  declarations: listOfComponents,
  imports: [CommonModule],
  exports: listOfComponents,
})
export class SharedModule {}