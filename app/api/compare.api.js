import { useMutation, useQuery } from 'react-query';
import { useClient } from '../hooks/useClient';

const DEFAULT_CACHE_TIME = 10 * 60 * 1000;

const useGetTeamList = ({ userId, search }) => {
  const client = useClient();
  return useQuery({
    queryFn: () => client(`team/list/teams/${userId}?keyword=${search}`),
    queryKey: ['teamsList', { search, userId }],
    cacheTime: DEFAULT_CACHE_TIME,
    enabled: !!userId,
  });
};

const useGetTeamComparison = () => {
  const client = useClient();
  return useMutation({
    mutationFn: ({ challengerId, defenderId }) =>
      client(`team/compare/${challengerId}/${defenderId}`),
  });
};

export { useGetTeamList, useGetTeamComparison };
