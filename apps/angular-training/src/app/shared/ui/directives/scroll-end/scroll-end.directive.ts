import {
	Directive,
	ElementRef,
	NgZone,
	OnDestroy,
	afterNextRender,
	input,
	output
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[scrollEnd]',
	standalone: true
})
export class ScrollEndDirective implements OnDestroy {
	nearEnd = output<void>();
	private subscription: Subscription;

	elementClass = input<string>();

	constructor(private readonly el: ElementRef, private readonly ngZone: NgZone) {
		afterNextRender(() => {
			this.runOutSide(() => {
				const getElement = () => {
					if (this.elementClass()) {
						return document?.querySelector(`.${this.elementClass()}`) ?? document;
					}
					return document;
				};
				const elementMemorized = getElement();
				const isCustomElement = getElement() instanceof Element;

				this.subscription = fromEvent(elementMemorized, 'scroll', {
					passive: true
				}).subscribe(() => {
					this.calculateScrollEnd(isCustomElement, elementMemorized);
				});
			});
		});
	}

	calculateScrollEnd(isCustomElement: boolean, elementMemorized: Element | Document) {
		// height of whole window page
		const heightOfWholePageWindow = window.document.documentElement.scrollHeight;

		const heightOfWholeObserver = isCustomElement
			? elementMemorized['scrollHeight']
			: window.document.documentElement.scrollHeight;
		// how big in pixels the element is
		const heightOfElement = this.el.nativeElement.scrollHeight;

		// currently scrolled Y position

		const currentScrolledY = isCustomElement ? elementMemorized['scrollTop'] : window.scrollY;

		// height of opened window - shrinks if console is opened
		const innerHeight = window.innerHeight;

		/**
		 * the area between the start of the page and when this element is visible
		 * in the parent component
		 */
		const spaceOfElementAndPage = heightOfWholeObserver - heightOfElement;

		// calculated whether we are near the end
		const scrollToBottom = heightOfElement - innerHeight - currentScrolledY + spaceOfElementAndPage;
		const divider = isCustomElement ? 20 : 3;
		// if the user is near end
		if (scrollToBottom < heightOfWholePageWindow / divider) {
			this.runInZone(() => {
				this.nearEnd.emit();
			});
		}
	}

	ngOnDestroy(): void {
		this.runInZone(() => {
			this.subscription?.unsubscribe?.();
		});
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	runOutSide(callbak: Function) {
		this.ngZone.runOutsideAngular(() => {
			callbak();
		});
	}
	// eslint-disable-next-line @typescript-eslint/ban-types
	runInZone(callbak: Function) {
		this.ngZone.run(() => {
			callbak();
		});
	}
}
