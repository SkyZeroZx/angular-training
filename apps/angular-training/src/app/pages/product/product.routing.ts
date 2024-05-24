import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent, ListProductComponent, UpdateProductComponent } from './components';
import { productResolver } from '@/core/resolvers/product';

export const productRoute: Routes = [
	{
		path: '',
		component: ListProductComponent
	},
	{
		path: 'create',
		component: CreateProductComponent
	},
	{
		path: 'update/:id',
		resolve: { product: productResolver },
		component: UpdateProductComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(productRoute)],
	exports: [RouterModule]
})
export class ProductRoutingModule {}
