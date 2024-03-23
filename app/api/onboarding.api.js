/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useClient } from '../hooks/useClient';
export function useGetPlayerStyle({ queryFilter, queryConfig = {} }) {
  const client = useClient();
  const qs = Object.keys(queryFilter)
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
    queryKey: ['player-styles', queryFilter],
    queryFn: () => client(`admin/list/player/category?${qs}`),
    ...queryConfig,
  });
}
export function usePlayerOnBoardingRegister({ onSuccess }) {
  const client = useClient();
  return useMutation(
    ({ data, id }) => {
      return client(`user/onboarding/${id}`, {
        method: 'POST',
        data,
      });
    },
    {
      onSuccess: data => {
        onSuccess(data);
      },
    },
  );
}
export function useCoachOnBoardingRegister({ onSuccess }) {
  const client = useClient();
  return useMutation(
    ({ data, id }) => {
      return client(`user/onboarding/${id}`, {
        method: 'POST',
        data,
      });
    },
    {
      onSuccess: data => {
        onSuccess(data);
      },
    },
  );
}

export const useGetListOfSchools = () => {
  const client = useClient();
  return useMutation(data => {
    let searchParamsObj = '';
    searchParamsObj = new URLSearchParams();
    if (data?.state) {
      searchParamsObj.append('state', data.state);
    }
    if (data?.city) {
      searchParamsObj.append('city', data.city);
    }
    return client(
      'admin/property/list/onboarding?' + searchParamsObj.toString(),
    );
  });
};

export const useGetListOfClasses = () => {
  const client = useClient();
  return useMutation(() => {
    return client('admin/property/list/years');
  });
};

export const useGetListOfStatesAndCities = () => {
  const client = useClient();
  return useMutation(data => {
    let searchParamsObj = '';
    searchParamsObj = new URLSearchParams();
    if (data?.state) {
      searchParamsObj.append('state', data.state);
    }
    return client('admin/property/list/states?' + searchParamsObj.toString());
  });
};
