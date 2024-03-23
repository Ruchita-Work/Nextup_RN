import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { useIsFocused } from '@react-navigation/native';
import { useGetAllChatChannels } from '../api/chat.api';

export const useInbox = () => {
  const { user } = useAuth();
  const isFocus = useIsFocused();
  const { mutate: getAllChatChannels } = useGetAllChatChannels();
  const [allChatChannelsData, setAllChatChannelsData] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(0);
  const [teamChatList, setTeamChatList] = useState([]);
  const [coachChatList, setCoachChatList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const getConcatedChats = (detailsObj = {}) => {
    return [
      ...(detailsObj?.groupChats
        ? detailsObj?.groupChats?.map(item => ({ ...item, type: 'GROUP' }))
        : []),
      ...(detailsObj?.oneOnOneChats
        ? detailsObj?.oneOnOneChats?.map(item => ({
            ...item,
            type: 'ONE_TO_ONE',
          }))
        : []),
    ];
  };

  const onSuccessGetAllChannelData = data => {
    const firstItem = data.data[0];
    setAllChatChannelsData(data.data);
    setSelectedTeamId(firstItem?.teamId);
    if (firstItem) {
      setTeamChatList(getConcatedChats(firstItem?.teamDetails));
      setCoachChatList(getConcatedChats(firstItem?.coachDetails));
    }
  };

  const setChatListData = id => {
    const foundTeam = allChatChannelsData?.find(cItem => cItem?.teamId === id);
    if (foundTeam) {
      setTeamChatList(getConcatedChats(foundTeam?.teamDetails));
      setCoachChatList(getConcatedChats(foundTeam?.coachDetails));
    }
  };

  const onChangeTeamHandler = item => {
    setSelectedTeamId(item?.teamId);
    setChatListData(item?.teamId);
  };

  const onSearchTextChangeHandler = text => {
    const searchText = text?.trim().toLowerCase();
    if (searchText) {
      const foundTeamData = allChatChannelsData?.find(
        cItem => cItem?.teamId === selectedTeamId,
      );
      if (activeIndex === 0) {
        const listdata = getConcatedChats(foundTeamData?.teamDetails);
        const filterData = listdata?.filter(cItem => {
          if (cItem?.type === 'GROUP') {
            return cItem?.groupName?.toLowerCase()?.includes(searchText);
          } else {
            return cItem?.otherUserName?.toLowerCase()?.includes(searchText);
          }
        });
        setTeamChatList(filterData);
      } else {
        const listdata = getConcatedChats(foundTeamData?.coachDetails);
        const filterData = listdata.filter(cItem => {
          if (cItem?.type === 'GROUP') {
            return cItem?.groupName?.toLowerCase()?.includes(searchText);
          } else {
            return cItem?.otherUserName?.toLowerCase()?.includes(searchText);
          }
        });
        setCoachChatList(filterData);
      }
    } else {
      setChatListData(selectedTeamId);
    }
  };

  useEffect(() => {
    if (isFocus) {
      getAllChatChannels(
        { userId: user?.id },
        { onSuccess: onSuccessGetAllChannelData },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocus]);

  return {
    teamChatList,
    coachChatList,
    allChatChannelsData,
    onChangeTeamHandler,
    selectedTeamId,
    onSearchTextChangeHandler,
    setActiveIndex,
  };
};
