/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import { useQuery } from 'react-query';
import { useClient } from '../hooks/useClient';

export function useGetPlayerTeams({ playerId }) {
  const client = useClient();
  return useQuery(
    {
      queryKey: [playerId],
      queryFn: () => client(`player/team/${playerId}`),
    },
    {
      enabled: !!playerId,
    },
  );
}

export const usePlayerDashboard = ({ playerId = null, teamId = null }) => {
  const client = useClient();
  return useQuery({
    queryKey: [playerId, teamId],
    queryFn: () =>
      client('player/dashboard', {
        method: 'POST',
        data: { teamId, playerId },
      }),
    enabled: !!playerId && !!teamId,
  });
};

// Define a new function to fetch premium challenges
export function usePremiumChallenges({ challengeListId }) {
  const client = useClient();

  // Use the useQuery hook to fetch data from the API
  return useQuery({
    queryKey: ['premiumChallenges', challengeListId], // Unique identifier for this query
    queryFn: () => client(`premium/challenge/list/${challengeListId}`),
  });
}
