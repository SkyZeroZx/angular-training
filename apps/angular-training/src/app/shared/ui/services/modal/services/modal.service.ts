import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Inject,
  Injectable,
  Type,
  createComponent,
} from '@angular/core';
import { CreateModal } from '../interface/modal.interface';
import { DOCUMENT } from '@angular/common';
import { ModalComponent } from '../components/modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  // Create a reference to our modal component
  protected newModalComponent!: ComponentRef<ModalComponent>;
  // Optional content passed at the creation : animation, size, ...
  protected options!: CreateModal;

  private readonly _listModalComponentRef: ComponentRef<ModalComponent>[] = [];

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector,
    @Inject(DOCUMENT)
    private readonly document: Document
  ) {}

  get listModalComponentRef() {
    return this._listModalComponentRef;
  }

  open<C>(component: Type<C>, createModalOptions?: CreateModal) {
    this.options = createModalOptions;
    return this.openWithComponent(
      createModalOptions ?? {},
      component
    ) as ComponentRef<C>;
  }

  private getProjectNodes(
    options: CreateModal,
    newComponent: ComponentRef<unknown>
  ) {
    const isBottomSheet = options?.mode === 'bottom-sheet';
    if (isBottomSheet) {
      return [[], [newComponent.location.nativeElement]];
    } else {
      return [[newComponent.location.nativeElement], []];
    }
  }

  private openWithComponent(options: CreateModal, component: Type<unknown>) {
    // create the desired component, the content of the modal box
    const newComponent: ComponentRef<any> = createComponent(component, {
      environmentInjector: this.injector,
    });

    // create the modal component and project the instance of the desired component in the ng-content
    this.newModalComponent = createComponent(ModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: this.getProjectNodes(options, newComponent),
    });

    this._listModalComponentRef.push(this.newModalComponent);

    this.newModalComponent.instance.mode.set(options?.mode || 'modal');
    this.newModalComponent.instance.style.set(options?.style || {});

    newComponent.instance['modalInstance'] = this.newModalComponent.instance;
    newComponent.instance['data'] = options?.data ?? null;

    this.newModalComponent.instance.closed.subscribe(() => {
      newComponent.destroy();
      this._listModalComponentRef.pop();
    });

    this.document.body.appendChild(
      this.newModalComponent.location.nativeElement
    );

    // Attach views to the changeDetection cycle
    this.appRef.attachView(newComponent.hostView);
    this.appRef.attachView(this.newModalComponent.hostView);
    return newComponent;
  }
}
