import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CreateProductComponent,
  ListProductComponent,
  UpdateProductComponent,
} from './components';
import { productResolver } from '@/core/resolvers/product';
import {
  canMatchDeviceDesktop,
  canMatchDeviceMobile,
} from '@angular-training/common';
import { ListProductMobileComponent } from './mobile';

export const productRoute: Routes = [
  {
    path: '',
    canMatch: [canMatchDeviceDesktop],
    component: ListProductComponent,
  },
  {
    path: '',
    canMatch: [canMatchDeviceMobile],
    component: ListProductMobileComponent,
  },
  {
    path: 'create',
    component: CreateProductComponent,
  },
  {
    path: 'update/:id',
    resolve: { product: productResolver },
    component: UpdateProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(productRoute)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
