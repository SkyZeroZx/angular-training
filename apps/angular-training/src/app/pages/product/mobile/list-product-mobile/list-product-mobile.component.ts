import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-list-product-mobile',
  templateUrl: './list-product-mobile.component.html',
  styleUrl: './list-product-mobile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListProductMobileComponent {}
