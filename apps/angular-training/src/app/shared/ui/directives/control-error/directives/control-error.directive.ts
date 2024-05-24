import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewContainerRef,
  input,
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { ControlErrorComponent } from '../components/control-error.component';
import { FORM_ERRORS } from '../form-error';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { fromEvent, merge } from 'rxjs';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[formControl], [formControlName]',
  standalone: true,
})
export class ControlErrorsDirective implements OnInit {
  ref!: ComponentRef<ControlErrorComponent>;
  container: ViewContainerRef;

  //Posibility of custom error in text message
  customErrors = input<{ [k: string]: any }>({});

  private readonly blurEvent$ = fromEvent(
    this.elementRef.nativeElement,
    'blur'
  );

  // eslint-disable-next-line max-params
  constructor(
    _vcr: ViewContainerRef,
    private viewContainerRef: ViewContainerRef,
    @Optional() controlErrorContainer: ControlErrorContainerDirective,
    @Inject(FORM_ERRORS) private errors: any,
    private ngControl: NgControl,
    private readonly elementRef: ElementRef,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.container = controlErrorContainer ? controlErrorContainer.vcr : _vcr;
  }

  ngOnInit() {
    merge(this.blurEvent$, this.ngControl.statusChanges).subscribe(() => {
      const controlErrors = this.ngControl?.errors;

      if (controlErrors) {
        const firstKey = Object.keys(controlErrors)[0];
        const getError = this.errors[firstKey];
        const text =
          this.customErrors()[firstKey] || getError?.(controlErrors[firstKey]);
         this.setError(text);
      } else if (this.ref) {
        this.setError(null);
      }
    });
  }

  setError(errorMessage: string | null) {
    if (!this.ref) {
      this.ref = this.viewContainerRef.createComponent(ControlErrorComponent);
    }

    this.ref.instance.text.set(errorMessage);
    this.changeDetectorRef.markForCheck();
  }
}
