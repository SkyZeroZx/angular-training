import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
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
  selector: 'button[btnLegacy]',
  standalone: true,
  imports: [],
  templateUrl: './button-custom-legacy.component.html',
  styleUrl: './button-custom-legacy.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonCustomLegacyComponent {
  @HostBinding('class') get classes() {
    return `button
    	button--${this.variant}
   		${BUTTON_SIZE_PADDINGS[this.size]}
   		${BUTTON_SIZE[this.size]}
     `;
  }

  @Input()
  size: 'sm' | 'lg' | 'xl' | '2xl' = 'lg';

  @Input()
  variant: 'primary' | 'secondary' = 'primary';

  @Input({ transform: booleanAttribute })
  loading = false;

  isEmpty(ref: HTMLDivElement) {
    return ref.textContent || ref.children.length;
  }
}
