import { Injectable } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoaderService {
	private apiCount = 0;
	private isLoadingSubject = new BehaviorSubject<boolean>(false);
	isLoading$ = this.isLoadingSubject.asObservable().pipe(delay(1));

	showLoader() {
		if (this.apiCount === 0) {
			this.isLoadingSubject.next(true);
		}
		this.apiCount++;
	}

	hideLoader() {
		this.apiCount--;
		if (this.apiCount === 0) {
			this.isLoadingSubject.next(false);
		}
	}
}
