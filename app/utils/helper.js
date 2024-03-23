import axios from 'axios';
import { v5 as uuidv5 } from 'uuid';
import { height, width } from '../constants/dimensions';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import flatten from 'lodash/flatten';

export const getDesiredNumber = (desiredNumber = 12) => {
  let number = desiredNumber;
  const factor = number / Math.min(height, width);
  const newNumber = Math.min(height, width) * factor;
  const adjustedNewNumber = Math.floor(newNumber / 4) * 4;
  return adjustedNewNumber;
};

export const extractKeyValuesToArray = (obj, keys) => {
  return (
    obj &&
    Object.entries(obj)
      .filter(([key]) => keys.includes(key))
      .map(([key, value]) => ({ key, value }))
  );
};

// export const getFormatedDate = (
//   date = moment(),
//   format = APP_CONFIG.DATE_FORMAT.DEFAULT,
// ) => {
//   return moment(date).format(format);
// };

// export const getFormatedTime = (
//   date = moment(),
//   format = APP_CONFIG.DATE_FORMAT.HH_MM,
// ) => {
//   return moment(date).format(format);
// };

export const getSliceAt = (str = ' STring', range1 = 0, range2 = 2) =>
  str.slice(range1, range2);

// export const getTripStatus = key => {
//   return tripStatus[key];
// };

export const getUniqueId = dataString => {
  const namespace = uuidv5.URL;
  return uuidv5(dataString, namespace);
};

export const errorMessageOnType = error => {
  switch (error?.type) {
    case 'required':
      return 'This field is required';
    case 'minLength':
    case 'maxLength':
      return `This field must be between ${error?.minLength} and ${error?.maxLength} characters`;
    case 'pattern':
      return 'Please enter a valid value';
    case 'notBefore':
      return 'You must be at least 18 years old';
  }
};

export const isJsonString = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const uploadImageApi = file => {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    name: file.fileName,
    type: file.type,
  });

  return axios({
    method: 'POST',
    url: 'http://34.134.29.128:8081/v1/storage/upload/image',
    maxBodyLength: Infinity,
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: '*',
    },
    data: formData,
  });
};

export const getSeasonString = () => {
  const currentYear = new Date().getFullYear() - 1;
  return `${currentYear}-${+currentYear.toString().slice(2) + 1}`;
};

export const getInvitePlayerDynamicLink = async userId => {
  const link = await dynamicLinks().buildShortLink({
    link: 'https://nextupapp.page.link/invite?user_id=' + userId,
    domainUriPrefix: 'https://nextupapp.page.link',
  });
  return link;
};

export const getQueryParamsFromURL = (url = '') => {
  const urlWithoutDomainPrefix = url?.split('/')?.slice(-1)?.[0] || '';
  const [domainSuffix, queryParamString] = urlWithoutDomainPrefix.split('?');
  if (!queryParamString) {
    return { domainSuffix, queryParams: null };
  }

  let regex = /[?&]([^=#]+)=([^&#]*)/g,
    queryParams = {},
    match;

  while ((match = regex.exec(url))) {
    queryParams[match[1]] = match[2];
  }

  return { domainSuffix, queryParams };
};

export const transformRoasterData = playerPositionInfoList => {
  const defaultVal = {};
  playerPositionInfoList?.forEach(item => {
    if (item?.playersWithPositionList) {
      item?.playersWithPositionList?.forEach(i => {
        defaultVal[i.teamPosition] = [];
      });
    }
  });
  if (!playerPositionInfoList || !playerPositionInfoList?.length) {
    return defaultVal;
  }

  const normalizedList = [];
  playerPositionInfoList.forEach(item => {
    const list = flatten([
      ...(item.playersWithPositionList
        ? item.playersWithPositionList.map(i =>
            i.availablePlayersList
              ? i.availablePlayersList.map(playerItem => ({
                  ...playerItem,
                  position: i.teamPosition,
                }))
              : [],
          )
        : []),
    ]);
    normalizedList.push({
      typeOfLevels: item.typeOfLevels,
      list: list,
    });
  });

  const listWithDataLevelIndex = normalizedList.findIndex(i => i.list.length);
  if (listWithDataLevelIndex === -1) {
    return defaultVal;
  }

  const finalData = defaultVal;
  const finalDataItem =
    playerPositionInfoList?.[listWithDataLevelIndex]?.playersWithPositionList;
  finalDataItem?.forEach(item => {
    finalData[item.teamPosition] = item.availablePlayersList
      ? item.availablePlayersList.map(playerItem => ({
          ...playerItem,
          position: item.teamPosition,
        }))
      : [];
  });

  return finalData;
};

export const filterValidTeams = (data = []) => {
  if (!data || !data?.length) {
    return [];
  }
  return data.filter(i => i.teamId);
};
