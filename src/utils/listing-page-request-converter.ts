import { rating } from '@/constants/filter';
import { QueryParamsType } from '@/types/general';

export const convertQueryObject = (queryObj: QueryParamsType) => {
  const queryArr = [];
  for (const [key, value] of Object.entries(queryObj)) {
    switch (true) {
      case key === 'pageNumber' || key === 'sort':
        break;
      case key === 'rating' && typeof value === 'string' && rating.includes(value):
        queryArr.push([key, Number(value)]);
        break;
      case key === 'type':
        queryArr.push(['types', value]);
        break;
      case key === 'duration':
        queryArr.push(['durations', value]);
        break;
      case Array.isArray(value) && value.length !== 0:
        queryArr.push([key, value]);
        break;
      case typeof value === 'number' && value !== 0:
        queryArr.push([key, value]);
        break;
      case typeof value === 'string' && value !== '':
        queryArr.push([key, value]);
        break;
      case typeof value === 'boolean' && value !== false:
        queryArr.push(['isOpenNow', true]);
        break;
      default:
    }
  }
  return Object.fromEntries(queryArr);
};

export const convertSort = (sort: string) => {
  let sortValue;
  switch (sort) {
    case 'Rating: Hight to low':
      sortValue = 'rating_desc';
      break;
    case 'Rating: Low to high':
      sortValue = 'rating_asc';
      break;
    case 'Price: High to low':
      sortValue = 'cost_desc';
      break;
    case 'Price: Low to high':
      sortValue = 'cost_asc';
      break;
    default:
      sortValue = 'rating_desc';
  }
  return sortValue;
};
