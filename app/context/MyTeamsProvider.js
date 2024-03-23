import React, { createContext, useState } from 'react';
import { getSeasonString } from '../utils/helper';

export const MyTeamsContext = createContext({
  selectedSeason: '',
  selectedTeam: null,
  setSelectedSeason: () => {},
  setSelectedTeam: () => {},
});

const MyTeamsProvider = ({ children }) => {
  const [selectedSeason, setSelectedSeason] = useState(getSeasonString());
  const [selectedTeam, setSelectedTeam] = useState(null);
  return (
    <MyTeamsContext.Provider
      value={{
        selectedSeason,
        selectedTeam,
        setSelectedSeason,
        setSelectedTeam,
      }}>
      {children}
    </MyTeamsContext.Provider>
  );
};

export default MyTeamsProvider;
