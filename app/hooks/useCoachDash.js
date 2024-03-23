import { useState } from 'react';
import { useGetCoachDashboard, useGetTeamInfo } from '../api/myteam.api';
import { filterValidTeams } from '../utils/helper';

export default function useCoachDash({ userId, season }) {
  const { data: teamInfoResponse } = useGetTeamInfo({ userId });
  const [teamIndex, selectTeam] = useState(0);
  const teams = filterValidTeams(teamInfoResponse?.data?.teamTabInfoDtoList);

  const currentTeam = teams[teamIndex];

  const { data: coachDashboardResponse } = useGetCoachDashboard({
    teamId: currentTeam?.teamId,
    userId,
    season,
  });

  return {
    teamIndex,
    selectTeam,
    teams,
    coachDashboardResponse,
    seasonLists: teamInfoResponse?.seasonLists,
  };
}
