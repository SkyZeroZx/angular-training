import { PaginationPipe } from '@/shared/pipes';
import {
  Ay11Module,
  ButtonComponent,
  ConfirmDialogDirective,
  ControlErrorModule,
  PaginationComponent,
  ScrollEndDirective,
} from '@/shared/ui';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DatePipe, JsonPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  CreateProductComponent,
  ListProductComponent,
  UpdateProductComponent,
} from './components';
import {
  ListProductMobileComponent,
  ProductDetailComponent,
  ProductItemComponent,
} from './mobile';
import { ProductRoutingModule } from './product.routing';
import { ProductFormComponent } from './shared/product-form';

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
    ButtonComponent,
    ScrollingModule,
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
