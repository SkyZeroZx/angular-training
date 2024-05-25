import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private _initialData = signal<unknown[]>([]);
  private dataFilter = signal<any[]>([]);

  setInitialData<T>(data: T[]) {
    this._initialData.set(data);
  }

  filterData<T>(filterText: string, filterProperties: string[]): T[] {
    if (!filterText) {
      return this._initialData() as T[];
    }

    this.dataFilter.set([...this._initialData()]);

    filterText = filterText.toLowerCase().trim();

    return this.dataFilter().filter((item) => {
      return filterProperties.some((prop) => {
        const value = item[prop]?.toString().toLowerCase();
        return value?.includes(filterText);
      });
    });
  }
}
