import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const useRouterQuery = <T extends Record<string, any>>() => {
  const router = useRouter();
  const urlQuery = router.query as unknown as T;
  const isRouterReady = router.isReady;
  const [initUrlQuery, setInitUrlQuery] = useState<T | {}>({});
  const [queryPath, setQueryPath] = useState<string | undefined>();

  //setUrlQuery function
  const setUrlQuery = useCallback((queryObj: T) => {
    //remove value =0 | [] | undefined in queryObj before push to router
    const queryArr = [];
    for (const [key, value] of Object.entries(queryObj)) {
      if (Array.isArray(value)) {
        if (value.length !== 0) {
          queryArr.push([key, value]);
        }
      } else {
        if (typeof value === 'number' && value !== 0) {
          queryArr.push([key, value]);
        }
        if (typeof value === 'string' && value !== '') {
          queryArr.push([key, value]);
        }
        if (typeof value === 'boolean' && value !== false) {
          queryArr.push([key, value]);
        }
      }
    }
    const urlObj = Object.fromEntries(queryArr);
    //push obj to router
    router.push(
      {
        // pathname: '/post/[pid]',
        query: urlObj,
      },
      undefined,
      { shallow: true }
    );
  }, []);

  //setInitUrlQuery when router is ready
  useEffect(() => {
    if (!isRouterReady) {
      return;
    }

    setInitUrlQuery(urlQuery);
  }, [isRouterReady]);

  useEffect(() => {
    if (!isRouterReady) {
      return;
    }
    const pathArr = router.asPath.split('?');

    const extractQueryPath = pathArr.length > 1 ? pathArr.pop() : undefined;
    setQueryPath(extractQueryPath);
  }, [isRouterReady, router.asPath]);

  return {
    isRouterReady,
    urlQuery,
    setUrlQuery,
    initUrlQuery,
    queryPath,
  };
};

export default useRouterQuery;
