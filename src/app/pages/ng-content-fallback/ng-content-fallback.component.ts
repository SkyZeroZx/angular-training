import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ng-content-fallback',
  templateUrl: './ng-content-fallback.component.html',
  styleUrl: './ng-content-fallback.component.scss',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class NgContentFallbackComponent {

}
