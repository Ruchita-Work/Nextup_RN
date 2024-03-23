// This hook will be used for getting schools , state, cities data
// These data can be used in mutiple places.
// We will manipulated data on the basis of user selection
//

import { useEffect, useMemo, useState } from 'react';
import { useGetSchools } from '../api/lookup.api';

export function useTeams() {
  const [query, setQuery] = useState(null);

  const { data: schoolData } = useGetSchools({
    queryFilter: query,
  });
  const schools = useMemo(() => {
    return schoolData?.data?.map(school => ({
      ...school,
      label: school?.name,
      value: school?.name,
    }));
  }, [schoolData]);

  const queryFilter = (key, value) => {
    setQuery(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  const resetFilter = () => {
    setQuery(null);
  };

  return {
    resetFilter,
    queryFilter,
    schools,
    query,
  };
}
