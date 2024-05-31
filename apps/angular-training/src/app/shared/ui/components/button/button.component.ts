import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
  booleanAttribute,
  input,
} from '@angular/core';

export const BUTTON_SIZE_PADDINGS = {
  sm: 'px-3 py-1',
  lg: 'px-3 py-2',
  xl: 'px-3 py-3',
  '2xl': 'px-4 py-4',
};

export const BUTTON_SIZE = {
  sm: 'text-sm',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
};

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[btn], a[btn], div[btn]',
  standalone: true,
  imports: [],
  template: ` @if (loading()) {
    <svg
      class="animate-spin mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    }
    <ng-content />`,
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @HostBinding('class') get classes() {
    return `button
    	button--${this.variant()}
   		${BUTTON_SIZE_PADDINGS[this.size()]}
   		${BUTTON_SIZE[this.size()]}
     `;
  }

  size = input<'sm' | 'lg' | 'xl' | '2xl'>('lg');
  variant = input<'primary' | 'secondary' | 'warn' | 'danger' | 'success'>(
    'primary'
  );
  loading = input(false, { transform: booleanAttribute });
}
