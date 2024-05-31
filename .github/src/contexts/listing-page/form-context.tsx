import { FC, ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useRouterQuery from '@/hooks/use-router-query';
import {
  FilterQueryParams,
  FilterQueryParamsSchema,
  QueryParamsSchema,
  QueryParamsType,
} from '@/types/general';

interface FilterFormProviderProps {
  children: ReactNode;
}
export const FilterFormProvider: FC<FilterFormProviderProps> = ({ children }) => {
  //update form values with urlQuery for the first time enter the page
  const { initUrlQuery } = useRouterQuery<QueryParamsType>();
  const parsedInitUrlQuery = QueryParamsSchema.parse(initUrlQuery);
  const parsedFilterUrlQuery = FilterQueryParamsSchema.parse(parsedInitUrlQuery);
  const methods = useForm<FilterQueryParams>({
    values: parsedFilterUrlQuery,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
