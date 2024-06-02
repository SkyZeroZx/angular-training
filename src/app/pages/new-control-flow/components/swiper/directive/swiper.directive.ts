import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Inject, Input, PLATFORM_ID } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';

register();

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[swiperElement]',
	standalone: true
})
export class SwiperDirective implements AfterViewInit {
	private readonly _swiperElement: HTMLElement;

	@Input()
	config?: SwiperOptions;

	constructor(private element: ElementRef<HTMLElement> ,@Inject(PLATFORM_ID) private plataformId : object) {
		this._swiperElement = element.nativeElement;
	}

	ngAfterViewInit(): void {
		Object.assign(this.element.nativeElement, this.config);
		if(isPlatformBrowser(this.plataformId)) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore - We ignore this because there is no initialize method on the HTMLElement
			this.element?.nativeElement?.initialize();
		} 
	}
}
