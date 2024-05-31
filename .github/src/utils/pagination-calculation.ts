type PaginationReturn = {
  pageCount: number;
  start: number;
  end: number;
};

/**
 * Calculates pagination details for a list of items.
 *
 * This function computes the start and end indices of items for a given page number
 *
 * @param pageSize - The number of items to display per page.
 * @param total - The total number of items across all pages.
 * @param pageNumber - The current page number.
 * @returns {PaginationReturn} An object containing the following properties:
 *   - pageCount: The total number of pages.
 *   - start: The index of the first item on the current page.
 *   - end: The index of the last item on the current page.
 */
export default function paginationCalculation(
  pageSize: number,
  total: number,
  pageNumber: number
): PaginationReturn {
  const pageCount = Math.ceil(total / pageSize);
  const start = (pageNumber - 1) * pageSize + 1;
  const end = pageNumber < pageCount ? pageNumber * pageSize : total;

  return { pageCount, start, end };
}
