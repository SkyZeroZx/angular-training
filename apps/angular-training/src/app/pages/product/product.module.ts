import { PaginationPipe } from '@/shared/pipes';
import {
  Ay11Module,
  ConfirmDialogDirective,
  ControlErrorModule,
  PaginationComponent,
} from '@/shared/ui';
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  CreateProductComponent,
  ListProductComponent,
  UpdateProductComponent,
} from './components';
import { ProductRoutingModule } from './product.routing';
import { ProductFormComponent } from './shared/product-form';
import { ListProductMobileComponent } from './mobile';
 
@NgModule({
  declarations: [
    ListProductComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ProductFormComponent,
    ListProductMobileComponent
   ],
  imports: [
    Ay11Module,
    DatePipe,
    ProductRoutingModule,
    PaginationPipe,
    ConfirmDialogDirective,
    FormsModule,
    ReactiveFormsModule,
    PaginationComponent,
    ControlErrorModule,
  ],
})
export class ProductModule {}
