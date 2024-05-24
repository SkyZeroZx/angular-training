import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogOptions } from '../../interfaces';

@Component({
	selector: 'app-confirm-dialog',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './confirm-dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
	@Input()
	confirmDialogOptions!: ConfirmDialogOptions;

	@Output()
	canceled = new EventEmitter<void>();

	@Output()
	confirmed = new EventEmitter<void>();

	constructor(private confirmDialogElement: ElementRef<HTMLElement>) {}

	cancel() {
		this.canceled.emit();
		this.removeConfirmDialog();
	}

	confirm() {
		this.confirmed.emit();
		this.removeConfirmDialog();
	}

	removeConfirmDialog() {
		this.confirmDialogElement.nativeElement.remove();
	}
}
