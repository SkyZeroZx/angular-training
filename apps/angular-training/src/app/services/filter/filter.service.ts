import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class FilterService {
	private initialData: unknown[] = [];
	private dataFilter: any[] = [];

	setInitialData<T>(data: T[]) {
		this.initialData = data;
	}

	filterData<T>(filterText: string, filterProperties: string[]): T[] {
		if (!filterText) {
			return this.initialData as T[];
		}

		this.dataFilter = [...this.initialData];

		filterText = filterText.toLowerCase().trim();

		return this.dataFilter.filter((item) => {
			return filterProperties.some((prop) => {
				const value = item[prop]?.toString().toLowerCase();
				return value?.includes(filterText);
			});
		});
	}
}
