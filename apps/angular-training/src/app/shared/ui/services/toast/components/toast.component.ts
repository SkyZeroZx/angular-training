import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  signal,
} from '@angular/core';

import { ToastData } from '../interface';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'closed',
        style({
          visibility: 'hidden',
          right: '-400px',
        })
      ),
      state(
        'open',
        style({
          right: '40px',
        })
      ),
      transition('open <=> closed', [animate('0.5s ease-in-out')]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  protected data = signal<ToastData>({
    message: '',
    title: '',
  });
  private readonly delayEaseOut = 500;

  constructor(
    private toastElement: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  open(data: ToastData) {
    this.data.set(data);
    this.countDown(data?.timeout);
  }

  hide() {
    this.data.update((value) => ({
      ...value,
      show: false,
    }));

    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.remove();
    }, this.delayEaseOut);
  }

  countDown(timeout = 3000) {
    setTimeout(() => {
      this.hide();
    }, timeout - this.delayEaseOut);

    setTimeout(() => {
      this.remove();
    }, timeout);
  }

  private remove() {
    this.toastElement.nativeElement.remove();
  }
}
