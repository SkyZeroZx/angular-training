import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./error.component.scss']
})
export class ErrorComponent {}
