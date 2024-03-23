// This hook will be used for getting schools , state, cities data
// These data can be used in mutiple places.
// We will manipulated data on the basis of user selection
//

import { useEffect, useMemo, useState } from 'react';
import {
  useGetCity,
  useGetClassOffYears,
  useGetSchools,
  useGetState,
} from '../api/lookup.api';

export function useLookup() {
  const [query, setQuery] = useState(null);
  const { data: classOfData } = useGetClassOffYears();
  const { data: stateData } = useGetState();
  const { data: cityData } = useGetCity({
    queryFilter: {
      state: query?.state,
    },
    queryConfig: {
      enabled: !!query?.state,
    },
  });
  const { data: schoolData } = useGetSchools({
    queryFilter: query,
  });

  const cities = useMemo(() => {
    return cityData?.data?.map(city => ({
      label: city,
      value: city,
    }));
  }, [cityData]);

  const states = useMemo(() => {
    return stateData?.data?.map(state => ({
      label: state,
      value: state,
    }));
  }, [stateData]);

  const schools = useMemo(() => {
    return schoolData?.data?.map(school => ({
      ...school,
      label: school?.name,
      value: school?.name,
    }));
  }, [schoolData]);

  const classOfYears = useMemo(() => {
    return classOfData?.data?.map(classOf => ({
      label: classOf,
      value: classOf,
      ...classOf,
    }));
  }, [classOfData]);

  const queryFilter = (key, value) => {
    if (key === 'state') {
      setQuery(prev => ({
        ...prev,
        city: '',
        [key]: value,
      }));
      return;
    }
    setQuery(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  const resetFilter = () => {
    setQuery(null);
  };

  useEffect(() => {
    if (states) {
      setQuery(prev => ({
        ...prev,
        state: states[0]?.value,
      }));
    }
  }, []);

  return {
    resetFilter,
    queryFilter,
    schools,
    cities,
    states,
    classOfYears,
    query,
  };
}
