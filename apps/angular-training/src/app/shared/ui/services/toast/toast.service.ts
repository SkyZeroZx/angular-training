import { Injectable } from '@angular/core';
import { ToastData } from './interface/toast.interface';
import { ToastTypes } from './constant/toast.enum';
import { OverlayService } from '../overlay';
import { ToastComponent } from './components/toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private readonly overlayService: OverlayService) {}

  success(toastData: ToastData) {
    const data = { show: true, type: ToastTypes.success, ...toastData };
    this.createToastComponent(data);
  }

  error(toastData: ToastData) {
    const data = { ...toastData, show: true, type: ToastTypes.error };
    this.createToastComponent(data);
  }

  warn(toastData: ToastData) {
    const data = { ...toastData, show: true, type: ToastTypes.warn };
    this.createToastComponent(data);
  }

  private createToastComponent(data: ToastData) {
    const componentRef = this.overlayService.attachRoot(ToastComponent);
    componentRef.instance.open(data);
    componentRef.changeDetectorRef.markForCheck();
  }
}
