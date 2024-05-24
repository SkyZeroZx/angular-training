import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';

export function filterSearch<T>(debounce = 200) {
	return function (source$: Observable<T>): Observable<T> {
		return source$.pipe(debounceTime(debounce), distinctUntilChanged());
	};
}
