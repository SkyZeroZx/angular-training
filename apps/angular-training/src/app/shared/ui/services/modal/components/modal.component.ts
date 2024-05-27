import { DOCUMENT, NgClass, NgStyle } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Inject,
	ModelSignal,
	OnInit,
	Output,
	Renderer2,
	computed,
	model,
	signal
} from '@angular/core';
import { FADE_ANIMATION_DELAY } from '../constants/animation.constant';
import { ModalService } from '../services/modal.service';

@Component({
	selector: 'app-modal',
	standalone: true,
	imports: [NgClass, NgStyle],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
	protected show = signal<boolean>(true);

	mode: ModelSignal<'dialog' | 'modal' | 'bottom-sheet'> = model('modal');
	// This is required since ngStyle is using `any` as well
	// More details in https://angular.io/api/common/NgStyle
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	style = model<{ [k: string]: any }>({});

	setting = computed(() => ({
		isModal: this.mode() === 'modal',
		isDialog: this.mode() === 'dialog',
		isBottomSheet: this.mode() === 'bottom-sheet'
	}));

	@Output()
	closed = new EventEmitter<void>();

	//	private elementSticky: HTMLElement;
	private htmlBaseElement!: HTMLHtmlElement;

	constructor(
		private readonly modalHost: ElementRef<HTMLElement>,
		@Inject(DOCUMENT) private readonly document: Document,
		private readonly renderer2: Renderer2,
		private readonly modalService: ModalService
	) {}

	ngOnInit(): void {
		this.hiddenScroll();
	}

	private hiddenScroll() {
		this.htmlBaseElement = this.document.getElementsByTagName('html')[0];
		this.htmlBaseElement.style.overflowY = 'hidden';
	}

	private addScroll() {
		if (this.modalService.listModalComponentRef.length === 0) {
			this.renderer2.setStyle(this.htmlBaseElement, 'overflowY', 'visible');
		}
	}

	open() {
		this.show.set(true);
	}

	close() {
		this.show.set(false);

		setTimeout(() => {
			this.closed.emit();
			this.modalHost.nativeElement.remove();
			this.addScroll();
		}, FADE_ANIMATION_DELAY);
	}
}
