import { Directive, HostListener, input, output } from '@angular/core';

import { DialogService } from '../services/dialog.service';

@Directive({
  selector: '[appConfirmDialog]',
  standalone: true,
})
export class ConfirmDialogDirective {
  message = input.required<string>();

  confirmButtonText = input.required<string>();

  cancelButtonText = input.required<string>();

  title = input.required<string>();

  confirm = output<void>();

  cancel = output<void>();

  private existDialog = false;

  constructor(private readonly dialogService: DialogService) {}

  @HostListener('click', ['$event'])
  async onClick(event: MouseEvent) {
    event?.preventDefault();

    event?.stopPropagation();

    if (this.existDialog) {
      return;
    }

    this.showDialog();
  }

  async showDialog() {
    this.existDialog = true;

    const instance = await this.dialogService.renderDialog({
      title: this.title(),
      message: this.message(),
      cancelButtonText: this.cancelButtonText(),
      confirmButtonText: this.confirmButtonText(),
    });

    instance.canceled.subscribe(() => {
      this.existDialog = false;
      this.cancel.emit();
    });

    instance.confirmed.subscribe(() => {
      this.existDialog = false;
      this.confirm.emit();
    });
  }
}
