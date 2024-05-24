import { NgModule } from '@angular/core';
import {
  ListProductComponent,
  CreateProductComponent,
  UpdateProductComponent,
} from './components';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ConfirmDialogDirective,
  ControlErrorModule,
  PaginationComponent,
} from '@/shared/ui';
import { PaginationPipe } from '../../shared/pipes/pagination.pipe';
import { ProductFormComponent } from './shared/product-form/product-form.component';

@NgModule({
  declarations: [
    ListProductComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
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
