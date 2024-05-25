import { DOCUMENT } from '@angular/common';
import {
	ApplicationRef,
	ComponentFactoryResolver,
	EmbeddedViewRef,
	Inject,
	Injectable,
	Injector,
	Type
} from '@angular/core';

@Injectable()
export class OverlayService {
	constructor(
		private componentFactory: ComponentFactoryResolver,
		private injector: Injector,
		@Inject(DOCUMENT)
		private document: Document,
		private applicationRef: ApplicationRef
	) {}

	attachRoot<T>(componentType: Type<T>) {
		const factory = this.componentFactory.resolveComponentFactory(componentType);
		const componentRef = factory.create(this.injector);

		this.applicationRef.attachView(componentRef.hostView);

		const domElem = (componentRef.hostView as EmbeddedViewRef<Type<T>>).rootNodes[0] as HTMLElement;

		this.document.body.appendChild(domElem);

		componentRef.changeDetectorRef.markForCheck();

		return componentRef;
	}
}
