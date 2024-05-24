import { Component, inject } from '@angular/core';
import { LoaderService } from '@/core/interceptor/loader-interceptor/loader.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  loader = inject(LoaderService);

  isLoading = toSignal(this.loader.isLoading$);
}
