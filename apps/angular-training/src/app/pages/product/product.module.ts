import { NgModule } from '@angular/core';
import { ListProductComponent, CreateProductComponent, UpdateProductComponent } from './components';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogDirective, ControlErrorModule, PaginationComponent } from '@/shared/ui';
import { PaginationPipe } from '../../shared/pipes/pagination.pipe';

@NgModule({
	declarations: [ListProductComponent, CreateProductComponent, UpdateProductComponent],
	imports: [
		CommonModule,
		ProductRoutingModule,
		PaginationPipe,
		ConfirmDialogDirective,
		FormsModule,
		ReactiveFormsModule,
		PaginationComponent,
		ControlErrorModule
	]
})
export class ProductModule {}
