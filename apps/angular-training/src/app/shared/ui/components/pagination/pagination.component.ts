import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [FormsModule , NgTemplateOutlet],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  /** The total number of records */

  collectionSize = input(0);

  /** The numbers list to display in select size of page to display */

  listPageSize = input([5, 10, 15, 20, 30, 40, 50]);

  /** The number of records to display */

  pageSize = model(5);

  /** Current page */
  currentPage = model(1);

  /** The number of buttons to show either side of the current page */

  maxSize = input(2);

  /** Display the First/Last buttons */
  firstLastButtons = input(false, { transform: booleanAttribute });

  /** Display the Next/Previous buttons */

  nextPreviousButtons = input(true, { transform: booleanAttribute });

  totalPages = computed(() => {
    return new Array(Math.ceil(this.collectionSize() / this.pageSize()));
  });

  protected isFirstPage = computed(() => this.currentPage() === 1);

  protected isLastPage = computed(
    () => this.currentPage() === this.totalPages().length
  );

  /** Set page number */
  selectPageNumber(pageNumber: number) {
    this.currentPage.set(pageNumber);
  }

  /** Set next page number */
  next() {
    const nextPage = this.currentPage() + 1;
    nextPage <= this.totalPages().length && this.selectPageNumber(nextPage);
  }

  /** Set previous page number */
  previous() {
    const previousPage = this.currentPage() - 1;
    previousPage >= 1 && this.selectPageNumber(previousPage);
  }

  onChangeSize(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.pageSize.set(Number(value));
    this.currentPage.set(1);
  }
}
