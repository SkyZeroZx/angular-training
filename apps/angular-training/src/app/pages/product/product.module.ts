import { PaginationPipe } from '@/shared/pipes';
import {
  Ay11Module,
  ConfirmDialogDirective,
  ControlErrorModule,
  PaginationComponent,
} from '@/shared/ui';
import { DatePipe, JsonPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  CreateProductComponent,
  ListProductComponent,
  UpdateProductComponent,
} from './components';
import { ProductRoutingModule } from './product.routing';
import { ProductFormComponent } from './shared/product-form';
import { ListProductMobileComponent, ProductDetailComponent, ProductItemComponent } from './mobile';
import { ScrollEndDirective } from '../../shared/ui/directives/scroll-end';

@NgModule({
  declarations: [
    ListProductComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ProductFormComponent,
    ListProductMobileComponent,
    ProductDetailComponent,
    ProductItemComponent,
  ],
  imports: [
    Ay11Module,
    DatePipe,
    JsonPipe,
    ScrollEndDirective,
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
