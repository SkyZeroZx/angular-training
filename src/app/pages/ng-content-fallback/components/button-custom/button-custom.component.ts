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
  selector: 'button[btn]',
  standalone: true,
  imports: [],
  templateUrl: './button-custom.component.html',
  styleUrl: './button-custom.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonCustomComponent {
  @HostBinding('class') get classes() {
    return `button
    	button--${this.variant()}
   		${BUTTON_SIZE_PADDINGS[this.size()]}
   		${BUTTON_SIZE[this.size()]}
     `;
  }

  size = input<'sm' | 'lg' | 'xl' | '2xl'>('lg');
  variant = input<'primary' | 'secondary' | 'warn' | 'danger' | 'success'>(
    'primary',
  );
  loading = input(false, { transform: booleanAttribute });
}
