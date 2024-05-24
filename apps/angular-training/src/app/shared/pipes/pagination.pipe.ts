import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination',
  standalone: true,
})
export class PaginationPipe<T = any> implements PipeTransform {
  transform(items: T[], currentPage: number, pageSize: number): T[] {
    if (!items || !items.length) {
      return [];
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    return items.slice(startIndex, endIndex);
  }
}
