import React from 'react';
import { Platform } from 'react-native';
export const characterLimit = {
  password: 7,
};
// export const API_ROOT = 'https://dev-api.nextupapp.co/v1/';
export const API_ROOT = 'http://52.32.19.152:8081/v1/';

// export const API_ROOT = 'https://4fd3-2405-201-3010-7ac0-d456-5e29-6301-2211.ngrok.io/v1/';

export const AppURLs = {
  Register: 'user/register',
  uploadProfile: 'storage/upload/',
  onBoard: 'user/onboarding/',
  otp: 'user/request/otp/',
  verifyOtp: 'user/verify/otp/',
  //Player
  playerHome: 'player/dashboard/',
  myStanding: 'player/standing/',
  myTeamD: 'team/detail/',
  leaderBoard: 'leaderboard/',
  updateHealthInfo: 'player/update/healthInfo/',
  gameDetail: 'game/',
  gameInfo: 'matches/',
  getSubscriptionInfo: 'player/roadToPro/',
  uploadChallengeVid: 'storage/upload/video/',
  updateChallenges: 'subscription/update/challenges/',
  reel: 'user/post/',
  createSubs: 'subscription/create',
  userInfo: 'user/basic/info/',
  updateInfo: 'user/update/profile/',
  playerMore: 'player/ranked/',
  playerMoreNew: 'leaderboard/player/more/',
  teamMoreNew: 'leaderboard/team/more/',
  // coachDash: 'coach/dashboard/',
  coachDash: 'coach/dashboard',
  coachTeam: 'coach/team/',
  coachPlayers: 'coach/player/',
  getPlayers: 'coach/player/list/',
  createTeam: 'team/create',
  addPlayerTo: 'team/update/team/members/',
  removePlayerTo: 'team/remove/team/members/',
  comparePlayers: 'coach/player/compare/',
  coachGetPlayersForProfile: 'coach/dashboard/player/',
  getChallengesListForCoach: 'plan/list',
  getSubscriptionInfoById: 'subscription/',
  createChallenegeForMultiplePayer: 'subscription/create/multiple',
  coachChallengeList: 'coach/challenges/',
  getChallengeInfoWithPlayerList: 'subscription/detail/coach/',
  getPlayerList: 'player/list/',

  //Chat
  createChannel: 'message/channels',
  messageStream: 'message/chats/stream/',
  postMessage: 'message/chats', //'message/chats', url changed
  chatUserList: 'message/',
  getInitialMessage: 'message/channel/',
  // teamInviteAction: 'team/approve/team/members/',
  postBulkMessage: 'message/bulk/create',

  //new design api
  coachRoles: 'admin/property/list?type=TEAM_COACH_ROLES',
  positions: 'admin/property/list?type=POSITIONS',
  checkSubscription: '/player/roadToPro/',
  teamRoles: 'team/roles/',
  removeCoachRole: 'team/remove/member/role/',
  // inviteCoach: 'team/invite/coach',
  inviteCoach: 'team/role/invite/coach',
  states: 'admin/property/list/states',
  years: 'admin/property/list/years',
  roadToPro: 'admin/property/list?type=ROAD_TO_PRO',
  coachRoadToPro: 'admin/property/list?type=COACH',
  coachNewTeam: 'coach/team/',
  // playerNewTeam: 'team/get/season/',
  playerNewTeam: 'player/team/',
  teamStats: 'team/stats/',
  playerTeamStats: 'player/stats/',
  teamTabPlayerList: 'team/player/',
  playerTeamTabPlayerList: 'player/player/',
  teamTabGameList: 'team/game/',
  playerTeamTabGameList: 'player/game/',
  newPlayerCompare: 'player/compare/',
  exploreSearch: 'search/',
  playerForShare: 'coach/list/players/share/',
  logOut: 'user/logout/',
  deleteAccount: '/v1/user/delete/{userId}/{token}',
  getPlayerCategory: 'admin/list/player/category',
  getSchoolOrTeam: 'admin/property/list/onboarding',
  sendPlayerInvitation: 'team/invite/player/',
  getMoreRecentGames: 'player/more/game/list/',
  getGameInitData: 'log/start/',
  getGameAdvanceStats: 'game/advance/stats/',
  getTeamAdvanceStats: 'team/get/advance/analytics/',
  logEventData: 'log/event/',
  logPlayerScore: 'log/player/',
  getCurrentLineUp: 'log/lineup/',

  //Eysa coach APIS
  getListOFChallenges: 'coach/challenge/',
  getListOFALLChallenges: 'coach/challenge/all/',
  getListOFChallengesPlayerDetails: 'coach/challenge/',
  getListOFChallengesSuggested: 'premium/plan/challenge/',

  getAIDrivenSearch: 'premium/plan/list/challenge/',
  getAIDrivenPlayerSearch: 'coach/challenge/',

  getListOfPlayers: 'team/player/',
  assignPlayersChallenge: 'subscription/create',

  assignPlayersRoadToPro: 'subscription/pro/create',

  //Eysa Player APIS

  listOfPlayers: 'player/team/',
  listRoadToPro: 'player/challenge/',

  assignedSeeAllChallenges: 'player/challenge/all/assigned/',
  suggestedSeeAllChallenges: 'player/challenge/all/suggested/',
  getDetailsForplayerSubmission: 'submission/detail/',
  verifyAnswer: 'premium/challenge/verify/',
  uploadVideo: 'storage/upload/video',

  submitPlayerData: 'submission/submit/',
  getProfileData: 'player/public/profile/',

  //  Eysa Game Screen API's

  getGameDetails: 'game/detail/',

  //eysa calendar screen
  getCollectEvents: 'search/',

  // Keshav implemented api's
  getLineUp: 'team/lineup/list/',
  getTeamSchedule: 'team/practice/list/',
  createPractice: 'team/practice/create/',
  createLineup: 'team/lineup/create/',
  getLineupBenchedPlayer: 'team/lineup/bench/',
  getCoachPublicProfile: 'coach/public/profile/',
  getPlayerDashBoardTeam: 'player/team/',
  teamInviteAction: 'team/approve/team/members',
  teamPublicProfile: 'team/public/profile/',
  searchApi: 'user/search/',
  getCoachList: 'team/list/coaches/',
  acceptCoachInvitation: 'coach/accept/team/invitation',
  getSuggestedProfile: 'admin/property/team/list/users/',
  confirmClaim: 'admin/property/confirm/identity',
  deleteLineup: 'team/lineup/delete',
  declineCoachInvitation: 'user/delete/invitation/',
  modifyTeamPlayer: 'team/modify/team/members',
  plyrCompar: 'user/compare/',
  playerListForCompare: 'player/list/player/',
  teamListForCompare: 'team/list/teams/',
  teamCompare: 'team/compare/',
};

export const USER_AUTH = 'USER_AUTH';
export const USER_TOKEN = 'USER_TOKEN';

export const SHOW_SHARE_SCREEN = {
  show: false,
};

export const userToken = {
  DEVICE_TOKEN: '',
};

export class UserModel {
  constructor() {
    selectedUserType,
      selectedSportPosition,
      isAdult,
      parentNameOrNum,
      email,
      password,
      fname,
      lname,
      city,
      state,
      school,
      classof,
      dob,
      aboutMe,
      profileUrl,
      photoIdUrl,
      isVerfied,
      coachCertiUrl,
      fid,
      isSocialLogin,
      isProfileUploaded,
      isBoy,
      isGirl,
      isHighSchool,
      ageGroup,
      coachingType,
      selected_coachingTyp,
      coachTeam,
      selected_height,
      weight,
      playerPlayingPosition;
  }
}

export const SenderRecevrModel = {
  senderId: '',
  senderName: '',
  senderProfilePic: '',
  senderType: '',

  receiverId: '',
  receiverName: '',
  receiverProfilePic: '',
  receiverType: '',
};

export const CoachChallenegeApproveData = {
  attempData: [],
};

export const Court_ptr = {
  ptr3: ['court_1', 'court_2', 'court_3', 'court_4', 'court_5', 'court_6'],
  ptr2: [
    'court_7',
    'court_8',
    'court_9',
    'court_10',
    'court_11',
    'court_12',
    'court_13',
  ],
};

export const Lang = 'en';
export const Country = 'country:us';
export const MapKey = 'AIzaSyD_pnQSbq-XF4yeiXF1MG9TS8HyNVpS6_4';
