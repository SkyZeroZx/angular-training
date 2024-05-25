import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ConfirmDialogOptions } from '../interfaces';
import { OverlayService } from '../../../services/overlay';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private readonly overlayService: OverlayService
  ) {}

  async renderDialog(dialogOptions: ConfirmDialogOptions) {
    const { ConfirmDialogComponent } = await import(
      '../components/confirm-dialog/confirm-dialog.component'
    );

    const confirmDialogComponent = this.overlayService.attachRoot(
      ConfirmDialogComponent
    );

    const { instance } = confirmDialogComponent;

    instance.confirmDialogOptions.set({
      message: dialogOptions.message,
      title: dialogOptions.title,
      confirmButtonText: dialogOptions.confirmButtonText,
      cancelButtonText: dialogOptions.cancelButtonText,
    });

    confirmDialogComponent.changeDetectorRef?.markForCheck();
    const htmlBaseElement = this.document.getElementsByTagName('html')[0];
    htmlBaseElement.style.overflowY = 'hidden';

    instance.confirmed.subscribe(() => {
      htmlBaseElement.style.overflow = 'visible';
    });

    instance.canceled.subscribe(() => {
      htmlBaseElement.style.overflow = 'visible';
    });

    return instance;
  }
}
