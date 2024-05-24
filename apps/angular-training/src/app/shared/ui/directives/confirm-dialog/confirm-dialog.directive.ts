import {
	ApplicationRef,
	Directive,
	EventEmitter,
	HostListener,
	Input,
	Output,
	ViewContainerRef,
	inject
} from '@angular/core';

@Directive({
	selector: '[appConfirmDialog]',
	standalone: true
})
export class ConfirmDialogDirective {
	@Input()
	message = '¿ Esta seguro ?';

	@Input()
	confirmButtonText = 'Confirmar';

	@Input()
	cancelButtonText = 'Cancelar';

	@Input()
	title = 'Title';

	@Output()
	confirm = new EventEmitter<void>();

	@Output()
	cancel = new EventEmitter<void>();

	private existDialog = false;

	private readonly applicationRef = inject(ApplicationRef);

	@HostListener('click', ['$event'])
	async onClick(event: MouseEvent) {
		event?.preventDefault();

		event?.stopPropagation();

		if (this.existDialog) {
			return;
		}

		this.createComponent();
	}

	getRootViewContainerRef(): ViewContainerRef {
		const appInstance = this.applicationRef?.components[0]?.instance;

		if (!appInstance?.viewContainerRef) {
			const appName = this.applicationRef.componentTypes[0]?.name;
			throw new Error(`Missing 'viewContainerRef' declaration in ${appName} constructor`);
		}

		return appInstance.viewContainerRef;
	}

	async createComponent() {
		this.existDialog = true;

		const { ConfirmDialogComponent } = await import(
			'./components/confirm-dialog/confirm-dialog.component'
		);

		const viewContainerRef = this.getRootViewContainerRef();
		const confirmDialogComponent = viewContainerRef.createComponent(ConfirmDialogComponent);

		const { instance } = confirmDialogComponent;

		instance.confirmDialogOptions = {
			message: this.message,
			title: this.title,
			confirmButtonText: this.confirmButtonText,
			cancelButtonText: this.cancelButtonText
		};

		confirmDialogComponent.changeDetectorRef?.detectChanges();

		instance.confirmed.subscribe(() => {
			this.existDialog = false;
			this.confirm.emit();
		});

		instance.canceled.subscribe(() => {
			this.existDialog = false;
			this.cancel.emit();
		});
	}
}
