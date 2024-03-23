/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import { useQuery } from 'react-query';
import { useClient } from '../hooks/useClient';

export function useGetState() {
  const client = useClient();
  return useQuery({
    queryKey: ['states', 'cites'],
    queryFn: () => client(`admin/property/list/states`),
  });
}

export function useGetCity({ queryFilter, queryConfig = {} }) {
  const client = useClient();
  const qs =
    queryFilter &&
    Object.keys(queryFilter)
      .map(key => {
        if (encodeURIComponent(queryFilter[key])) {
          return `${encodeURIComponent(key)}=${encodeURIComponent(
            queryFilter[key],
          )}`;
        }
      })
      .filter(pair => pair)
      .join('&');
  return useQuery({
    queryKey: ['state', queryFilter],
    queryFn: () => client(`admin/property/list/states?${qs}`),
    enabled: !!qs,
    ...queryConfig,
  });
}

export function useGetClassOffYears() {
  const client = useClient();
  return useQuery({
    queryKey: ['classes'],
    queryFn: () => client(`admin/property/list/years`),
  });
}

export function useGetSchools({ queryFilter, queryConfig = {} }) {
  const client = useClient();
  const qs =
    queryFilter &&
    Object.keys(queryFilter)
      .map(key => {
        if (encodeURIComponent(queryFilter[key])) {
          return `${encodeURIComponent(key)}=${encodeURIComponent(
            queryFilter[key],
          )}`;
        }
      })
      .filter(pair => pair)
      .join('&');
  return useQuery({
    queryKey: ['state', 'city', queryFilter],
    queryFn: () => client(`admin/property/list/onboarding?${qs}`),
    ...queryConfig,
  });
}
