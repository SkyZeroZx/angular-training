import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription, interval, skip, takeUntil } from 'rxjs';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-spinner-counter',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './spinner-counter.component.html',
  styleUrl: './spinner-counter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerCounterComponent implements OnInit, OnDestroy {
  title = input.required();

  counter = model<number>(10);

  isZeroCounter = computed(() => {
    return this.counter() === 0;
  });

  onDestroy = output<void>();

  // skip initial value because it's initialized of signal
  isZeroCounter$ = toObservable(this.isZeroCounter).pipe(skip(1));

  interval$ = interval(1_000).pipe(takeUntil(this.isZeroCounter$));

  update = outputFromObservable(this.interval$);

  completed = outputFromObservable(this.isZeroCounter$);

  subscription!: Subscription;

  private initialCounter: number = 0;

  constructor(
    @Inject(PLATFORM_ID)
    private plataformId: object,
  ) {}

  restartCounter() {
    this.counter.set(this.initialCounter);
  }

  ngOnInit(): void {
    this.counterDown();
    this.saveInitialCounter();
  }

  private saveInitialCounter() {
    this.initialCounter = this.counter();
  }

  counterDown() {
    if (isPlatformBrowser(this.plataformId)) {
      this.subscription = this.interval$.subscribe(() => {
        this.counter.set(this.counter() - 1);
      });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.plataformId)) {
      this.subscription.unsubscribe();
    }
    this.onDestroy.emit();
  }
}
