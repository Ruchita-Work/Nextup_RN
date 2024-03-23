/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useClient } from '../hooks/useClient';
import { useAuth } from '../hooks/useAuth';
import moment from 'moment';

const DEFAULT_CACHE_TIME = 10 * 60 * 1000;

export const useAddTeamApi = () => {
  const client = useClient();
  const qc = useQueryClient();
  return useMutation(data => client('team/create', { method: 'POST', data }), {
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['coachTeams'],
        exact: false,
      });
    },
  });
};

export const useGetPlayersForInvite = ({ userId, search }) => {
  const client = useClient();

  let url = `player/list/${userId}`;
  if (search) {
    url += `?search=${search}`;
  }

  return useQuery({
    queryFn: () => client(url),
    queryKey: ['invitePlayersList', { search, userId }],
    cacheTime: DEFAULT_CACHE_TIME,
  });
};

export const useInviteOutsidePlayer = () => {
  const client = useClient();
  return useMutation(({ teamId, payload }) =>
    client('team/invite/player/' + teamId, { method: 'POST', data: payload }),
  );
};

export const useGetGameTabForTeam = ({
  teamId,
  userId,
  season,
  onError,
  enabled = true,
}) => {
  const client = useClient();
  const currentTime = Math.round(new Date().getTime() / 1000);
  return useQuery({
    queryFn: () =>
      client(`team/game/${teamId}/${userId}/${currentTime}?season=${season}`),
    queryKey: ['GamesTab', teamId, userId, season],
    onError,
    enabled,
    cacheTime: DEFAULT_CACHE_TIME,
  });
};

export const useInvitePlayerToTeam = () => {
  const client = useClient();
  return useMutation(({ teamId, season, position, payload }) =>
    client(
      `team/update/team/members/${teamId}?season=${season}&&position=${position}`,
      {
        method: 'POST',
        data: payload,
      },
    ),
  );
};

export const useGetScheduleListForTeam = ({
  teamId,
  season,
  enabled = true,
  onError,
}) => {
  const client = useClient();
  return useQuery({
    queryFn: () => client(`team/practice/list/${teamId}?season=${season}`),
    queryKey: ['ScheduleTab', teamId, season],
    enabled,
    onError,
    cacheTime: DEFAULT_CACHE_TIME,
  });
};

export const useGetTeamPlayerPage = ({
  teamId,
  season,
  onError,
  enabled = true,
}) => {
  const client = useClient();
  return useQuery({
    queryFn: () => client(`team/player/${teamId}?season=${season}`),
    queryKey: ['MyTeamRosterTab', teamId, season],
    onError,
    enabled,
    cacheTime: DEFAULT_CACHE_TIME,
  });
};

export const useGetTeamInfo = ({ userId, onSuccess }) => {
  const client = useClient();
  const { isCoach } = useAuth();
  const url = isCoach ? `coach/team/${userId}` : `player/team/${userId}`;

  return useQuery({
    queryFn: () => client(url),
    queryKey: ['coachTeams', userId],
    onSuccess,
    cacheTime: DEFAULT_CACHE_TIME,
  });
};

export const useGetPlayerPublicProfile = ({ playerId, enabled = true }) => {
  const client = useClient();
  return useQuery({
    queryFn: () => client(`player/public/profile/${playerId}`),
    queryKey: ['playerPublicProfile', playerId],
    cacheTime: DEFAULT_CACHE_TIME,
    enabled,
  });
};

export const useGetRoleTabData = ({
  teamId,
  userId,
  season,
  enabled = true,
  onError,
}) => {
  const client = useClient();
  return useQuery({
    queryFn: () => client(`team/roles/${teamId}/${userId}?season=${season}`),
    queryKey: ['teamRoleTab', teamId, userId, season],
    onError,
    enabled,
    cacheTime: DEFAULT_CACHE_TIME,
  });
};

export const useCreatePracticeByCoach = () => {
  const client = useClient();
  return useMutation(({ teamId, season, payload }) =>
    client(`team/practice/create/${teamId}?season=${season}`, {
      method: 'POST',
      data: payload,
    }),
  );
};

export const useInviteNewAdminRole = () => {
  const client = useClient();
  return useMutation(({ payload }) =>
    client('team/invite/coach', {
      method: 'POST',
      data: payload,
    }),
  );
};

export const useReadMessageOfChannel = () => {
  const client = useClient();
  return useMutation({
    mutationFn: ({ channelId }) => client(`message/read/${channelId}`),
  });
};

export const useDeleteStaff = () => {
  const client = useClient();
  return useMutation({
    mutationFn: ({ teamId, coachId }) =>
      client(`team/remove/member/role/${teamId}/${coachId}`),
  });
};

export const useGetTeamStats = ({
  teamId,
  coachId,
  season,
  enabled = true,
}) => {
  const client = useClient();
  return useQuery({
    queryFn: () => client(`team/stats/${teamId}/${coachId}?season=${season}`),
    queryKey: ['teamStats', { teamId, coachId, season }],
    enabled,
  });
};

export const useGetAdvanceTeamStats = ({ teamId, season, enabled = true }) => {
  const client = useClient();
  return useQuery({
    queryFn: () => client(`team/get/advance/analytics/${teamId}/${season}`),
    queryKey: ['teamAdvanceStats', { teamId, season }],
    enabled,
  });
};

export const useGetAdvanceGameStats = ({ gameId, enabled = true }) => {
  const client = useClient();
  return useQuery({
    queryFn: () => client(`game/advance/stats/${gameId}`),
    queryKey: ['gameAdvanceStats', { gameId }],
    enabled,
    cacheTime: DEFAULT_CACHE_TIME,
  });
};

export const useGetLineups = ({ teamId, season, enabled = true }) => {
  const client = useClient();
  return useQuery({
    queryFn: () => client(`team/lineup/list/${teamId}?season=${season}`),
    enabled,
    queryKey: ['lineupsList', teamId, season],
    cacheTime: DEFAULT_CACHE_TIME,
  });
};

export const useCreateLineup = () => {
  const client = useClient();
  return useMutation(({ teamId, season, payload }) =>
    client(`team/lineup/create/${teamId}?season=${season}`, {
      method: 'POST',
      data: payload,
    }),
  );
};

export const useGetCoachPublicProfile = ({ coachId }) => {
  const client = useClient();
  return useQuery({
    queryFn: () => client(`coach/public/profile/${coachId}`),
    queryKey: ['CoachPublicProfile', coachId],
    cacheTime: DEFAULT_CACHE_TIME,
    enabled: !!coachId,
  });
};

export const useGetCoachDashboard = ({ teamId, season, userId }) => {
  const client = useClient();
  const currentTime = Math.round(new Date().getTime() / 1000);

  const payload = {
    coachId: userId,
    teamId,
    currentTime,
    season,
  };

  return useQuery({
    queryFn: () => client('coach/dashboard', { method: 'POST', data: payload }),
    enabled: !!teamId && !!season && !!userId,
    cacheTime: DEFAULT_CACHE_TIME,
    queryKey: ['coach-dashboard', userId, teamId, season],
  });
};

export const useGetScheduleData = ({
  currentTime = Math.round(new Date().getTime()),
}) => {
  const { user, isCoach, isPlayer } = useAuth();
  const client = useClient();
  let queryParam = '';
  if (isPlayer) {
    queryParam = `?playerId=${user?.id}`;
  }
  if (isCoach) {
    queryParam = `?coachId=${user?.id}`;
  }
  return useQuery({
    queryFn: () => client(`search/${currentTime}${queryParam}`),
    enabled: !!user?.id && (!!isCoach || !!isPlayer),
    queryKey: ['scheduledata', { userId: user?.id, currentTime }],
  });
};

export const useGetMonthlyScheduleData = () => {
  const client = useClient();
  const { user, isCoach, isPlayer } = useAuth();

  let queryParam = '';
  if (isPlayer) {
    queryParam = `?playerId=${user?.id}`;
  }
  if (isCoach) {
    queryParam = `?coachId=${user?.id}`;
  }

  return useMutation({
    mutationFn: ({ startDate, endDate }) =>
      client(`search/${startDate}/${endDate}${queryParam}`),
    enabled: !!user?.id && (!!isCoach || !!isPlayer),
    mutationKey: ['scheduledata', { userId: user?.id }],
  });
};

export const useGetGameDetails = gameId => {
  const client = useClient();
  return useQuery({
    queryFn: () => client(`game/detail/${gameId}`),
    queryKey: ['game-details', { gameId }],
  });
};
