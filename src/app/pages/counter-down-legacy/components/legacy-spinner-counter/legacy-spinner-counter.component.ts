import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, Subscription, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-legacy-spinner-counter',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './legacy-spinner-counter.component.html',
  styleUrl: './legacy-spinner-counter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegacySpinnerCounterComponent {
  @Input({ required: true })
  title!: string;

  @Input()
  counter: number = 20;

  @Output()
  counterChange = new EventEmitter<number>();

  @Output()
  onDestroy = new EventEmitter();

  isZeroCounter$ = new Subject<void>();

  interval$ = interval(1_000).pipe(takeUntil(this.isZeroCounter$));

  @Output()
  update = new EventEmitter<void>();

  @Output()
  completed = new EventEmitter();

  private subscription!: Subscription;

  private initialCounter: number = 0;

  private readonly isBrowser = isPlatformBrowser(this.plataformId);

  constructor(
    @Inject(PLATFORM_ID)
    private plataformId: object,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  restartCounter() {
    this.counter = this.initialCounter;
    this.changeDetectorRef.markForCheck();
  }

  listenCompleted() {
    this.isZeroCounter$.subscribe(() => this.completed.emit());
  }

  ngOnInit(): void {
    this.counterDown();
    this.saveInitialCounter();
    this.listenCompleted();
  }

  private saveInitialCounter() {
    this.initialCounter = this.counter;
  }

  counterDown() {
    if (this.isBrowser) {
      this.subscription = this.interval$.subscribe(() => {
        const isZeroOrLess = this.counter <= 0;
        if (!isZeroOrLess) {
          this.counter = this.counter - 1;
          console.log(this.counter);
          this.counterChange.emit(this.counter);
        } else {
          this.isZeroCounter$.next();
        }
        this.update.emit();
        this.changeDetectorRef.markForCheck();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.subscription.unsubscribe();
      this.onDestroy.emit();
    }
  }
}
