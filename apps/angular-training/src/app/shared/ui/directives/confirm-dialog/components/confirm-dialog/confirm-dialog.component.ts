import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  model,
  output,
} from '@angular/core';
import { ConfirmDialogOptions } from '../../interfaces';
import { ButtonComponent } from '../../../../components/button/button.component';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './confirm-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  confirmDialogOptions = model<ConfirmDialogOptions>();

  canceled = output<void>();

  confirmed = output<void>();

  constructor(private confirmDialogElement: ElementRef<HTMLElement>) {}

  cancel() {
    this.canceled.emit();
    this.removeConfirmDialog();
  }

  confirm() {
    this.confirmed.emit();
    this.removeConfirmDialog();
  }

  removeConfirmDialog() {
    this.confirmDialogElement.nativeElement.remove();
  }
}
