import {
  Component,
  ChangeDetectionStrategy,
  model,
  computed,
} from '@angular/core';

@Component({
  templateUrl: './control-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./control-error.component.scss'],
})
export class ControlErrorComponent {
  text = model<string>(null);

  protected hide = computed(() => this.text() === null);
}
