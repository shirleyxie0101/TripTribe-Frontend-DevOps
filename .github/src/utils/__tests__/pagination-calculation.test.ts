import paginationCalculation from '../pagination-calculation';

describe('pagination calculation', () => {
  it('should return correct pageCount, and correct start&end for the first page when total < pageSize', () => {
    const mockedPageSize = 10;
    const mockedTotal = 8;
    const mockedPageNumber = 1;
    const { pageCount, start, end } = paginationCalculation(
      mockedPageSize,
      mockedTotal,
      mockedPageNumber
    );
    expect(pageCount).toBeDefined();
    expect(pageCount).toBe(1);
    expect(start).toBe(1);
    expect(end).toBe(8);
  });

  it('should return correct pageCount, and correct start&end for the last page when total%pageSize === 0', () => {
    const mockedPageSize = 10;
    const mockedTotal = 50;
    const mockedPageNumber = 5;
    const { pageCount, start, end } = paginationCalculation(
      mockedPageSize,
      mockedTotal,
      mockedPageNumber
    );
    expect(pageCount).toBeDefined();
    expect(pageCount).toBe(5);
    expect(start).toBe(41);
    expect(end).toBe(50);
  });

  it('should return correct pageCount, and correct start&end for the last page when total%pageSize>0', () => {
    const mockedPageSize = 10;
    const mockedTotal = 55;
    const mockedPageNumber = 6;
    const { pageCount, start, end } = paginationCalculation(
      mockedPageSize,
      mockedTotal,
      mockedPageNumber
    );
    expect(pageCount).toBeDefined();
    expect(pageCount).toBe(6);
    expect(start).toBe(51);
    expect(end).toBe(55);
  });
});
