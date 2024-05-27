import { Product } from '@/core/interface/product';
import { ModalService } from '@/shared/ui/services/modal';
import { DetectDeviceService } from '@angular-training/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent {
  product = input.required<Product>();

  constructor(
    private readonly modalService: ModalService,
    private readonly detectDevice: DetectDeviceService
  ) {}

  showModal() {
    const isMobile = this.detectDevice.isMobile();
    const mode = isMobile ? 'bottom-sheet' : 'dialog';
    this.modalService.open(ProductDetailComponent, {
      mode,
      data: this.product(),
    });
  }
}
