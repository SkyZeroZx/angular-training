import { Directive, HostListener, output } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[role=button]',
  standalone: true 
})
export class ButtonAy11Directive {
  click = output<void>();
  a11yAction = output<void>();

  @HostListener('keydown', ['$event'])
  clicked(e: KeyboardEvent) {
    const keyD = e.key !== undefined ? e.key : e.keyCode;
    // e.key && e.keycode have mixed support - keycode is deprecated but support is greater than e.key
    // I tested within IE11, Firefox, Chrome, Edge (latest) & all had good support for e.key

    if (
      keyD === 'Enter' ||
      keyD === 13 ||
      ['Spacebar', ' '].indexOf(keyD?.toString()) >= 0 ||
      keyD === 32
    ) {
      // In IE11 and lower, e.key will equal "Spacebar" instead of ' '

      // Default behavior is prevented to prevent the page to scroll when "space" is pressed
      e.preventDefault();
      this.click.emit();
      this.a11yAction.emit();
    }
  }
}
