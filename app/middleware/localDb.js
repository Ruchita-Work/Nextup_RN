import Realm, { schemaVersion } from 'realm';

const EventSchema = {
  name: 'game_event',
  properties: {
    _id: { type: 'int' },
    firstPlayerId: { type: 'int', optional: true },
    secondPlayerId: { type: 'int', optional: true },
    gameAction: { type: 'string' },
    eventTime: { type: 'int' },
    court: { type: 'string', optional: true },
    courtXCoord: { type: 'string', optional: true },
    courtYCoord: { type: 'string', optional: true },
    quarter: { type: 'string' },
  },
  primaryKey: '_id',
};

async function insertEvent(data) {
  const realm = await Realm.open({
    path: 'NextUpLocalDB/Events',
    schema: [EventSchema],
    deleteRealmIfMigrationNeeded: true,
    // schemaVersion: 1,
    //   migration: (oldRealm, newRealm) => {
    //     if(oldRealm.schemaVersion < 2){
    //         const oldObjects = oldRealm.objects('game_event');
    //         const newObjects = newRealm.objects('game_event');
    //         // loop through all objects and set the _id property in the new schema
    //         for (const objectIndex in oldObjects) {
    //           const oldObject = oldObjects[objectIndex];
    //           const newObject = newObjects[objectIndex];
    //         }
    //     }
    // },
  });

  if (realm) {
    let task;
    realm.write(() => {
      task = realm.create('game_event', data);
      // console.log('data inserted---', data);
      //// console.log(task._id)
      //// console.log(task.firstPlayerId)
      //// console.log(task.secondPlayerId)
      //// console.log(task.gameAction)
      //// console.log(task.eventTime)
      //// console.log(task.court)
    });

    const res = realm.objects('game_event');
    // console.log('data retrive---', res.length);
    let resData = [];
    res.forEach((obj) => {
      let dataObj = {
        _id: obj._id,
        firstPlayerId: obj.firstPlayerId,
        secondPlayerId: obj.secondPlayerId,
        gameAction: obj.gameAction,
        eventTime: obj.eventTime,
        court: obj.court,
        courtXCoord: obj.courtXCoord,
        courtYCoord: obj.courtYCoord,
        quarter: obj.quarter,
      };
      // console.log('data objj---', dataObj);
    });
    // console.log('Data_arrr--', resData);
    //
    // for (const obj in res) {
    //
    //  // console.log("data objj---", dataObj);
    //   resData.push(dataObj);
    // }
    //
    realm.close();
  }
  realm.close();
}

const BlueTeamPlayerScoreSchema = {
  name: 'blue_team_player_score',
  properties: {
    _id: { type: 'string' },
    teamId: { type: 'string', optional: true },
    playerScore: { type: 'list', objectType: 'string' },
    // playerId: { type: 'string' },

    // jerseyNumber: { type: 'int' },
    // ast: { type: 'int', optional: true },
    // pts: { type: 'int', optional: true },
    // reb: { type: 'int', optional: true },
    // stl: { type: 'int', optional: true },
    // blk: { type: 'int', optional: true },
    // foul: { type: 'int', optional: true },
    // freeThrowCount: { type: 'int', optional: true },
    // freeThrowMadeCount: { type: 'int', optional: true },
    // freeThrowMissedCount: { type: 'int', optional: true },
    quarter: { type: 'string' },
  },
  primaryKey: '_id',
};

async function insertBluePlayerScore(data) {
  const realm = await Realm.open({
    path: 'NextUpLocalDB/BluePlayerScore',
    schema: [BlueTeamPlayerScoreSchema],
    deleteRealmIfMigrationNeeded: true,
    // schemaVersion: 1,
    //   migration: (oldRealm, newRealm) => {
    //     if(oldRealm.schemaVersion < 2){
    //         const oldObjects = oldRealm.objects('game_event');
    //         const newObjects = newRealm.objects('game_event');
    //         // loop through all objects and set the _id property in the new schema
    //         for (const objectIndex in oldObjects) {
    //           const oldObject = oldObjects[objectIndex];
    //           const newObject = newObjects[objectIndex];
    //         }
    //     }
    // },
  });

  if (realm) {
    let task;
    realm.write(() => {
      task = realm.create('blue_team_player_score', data, 'modified');
      // console.log('player data inserted---', task);
      //// console.log(task._id)
      //// console.log(task.playerId)
    });
    realm.close();
  }
  realm.close();
}

const RedTeamPlayerScoreSchema = {
  name: 'red_team_player_score',
  properties: {
    _id: { type: 'string' },
    teamId: { type: 'string', optional: true },
    playerScore: { type: 'list', objectType: 'string' },

    quarter: { type: 'string' },
  },
  primaryKey: '_id',
};

async function insertRedPlayerScore(data) {
  const realm = await Realm.open({
    path: 'NextUpLocalDB/RedPlayerScore',
    schema: [RedTeamPlayerScoreSchema],
    deleteRealmIfMigrationNeeded: true,
    // schemaVersion: 1,
    //   migration: (oldRealm, newRealm) => {
    //     if(oldRealm.schemaVersion < 2){
    //         const oldObjects = oldRealm.objects('game_event');
    //         const newObjects = newRealm.objects('game_event');
    //         // loop through all objects and set the _id property in the new schema
    //         for (const objectIndex in oldObjects) {
    //           const oldObject = oldObjects[objectIndex];
    //           const newObject = newObjects[objectIndex];
    //         }
    //     }
    // },
  });

  if (realm) {
    let task;
    realm.write(() => {
      task = realm.create('red_team_player_score', data, 'modified');
      // console.log('player data inserted---', task);
    });
    realm.close();
  }
  realm.close();
}

const TeamScoreSchema = {
  name: 'team_score',
  properties: {
    _id: { type: 'int' },
    teamId: { type: 'string' },
    isChallenger: { type: 'bool' },
    currentScore: { type: 'int' },
    quarter: { type: 'string' },
  },
  primaryKey: '_id',
};

async function insertTeamScore(data) {
  const realm = await Realm.open({
    path: 'NextUpLocalDB/TeamScore',
    schema: [TeamScoreSchema],
    deleteRealmIfMigrationNeeded: true,
    // schemaVersion: 1,
    //   migration: (oldRealm, newRealm) => {
    //     if(oldRealm.schemaVersion < 2){
    //         const oldObjects = oldRealm.objects('game_event');
    //         const newObjects = newRealm.objects('game_event');
    //         // loop through all objects and set the _id property in the new schema
    //         for (const objectIndex in oldObjects) {
    //           const oldObject = oldObjects[objectIndex];
    //           const newObject = newObjects[objectIndex];
    //         }
    //     }
    // },
  });

  if (realm) {
    let task;
    realm.write(() => {
      task = realm.create('team_score', data, 'modified');
      // console.log('team score inserted---');
      // console.log(task._id);
      // console.log(task.teamId);
    });
    realm.close();
  }
  realm.close();
}

async function getEventDataFromRealm(cb) {
  const realm = await Realm.open({
    path: 'NextUpLocalDB/Events',
    schema: [EventSchema],
  });

  if (realm) {
    let task;
    const res = realm.objects('game_event');

    //// console.log("event data retrive---", res)
    let resData = [];
    if (res) {
      res.forEach((obj) => {
        let res_obj = {
          _id: obj._id,
          firstPlayerId: obj.firstPlayerId,
          secondPlayerId: obj.secondPlayerId,
          gameAction: obj.gameAction,
          eventTime: obj.eventTime,
          court: obj.court,
          courtXCoord: obj.courtXCoord,
          courtYCoord: obj.courtYCoord,
          quarter: obj.quarter,
        };
        resData.push(res_obj);
      });
    }
    realm.close();
    cb(true, resData);
  }
}

async function getPlayerScoreFromRealm(cb) {
  let resData = [];
  const realm = await Realm.open({
    path: 'NextUpLocalDB/BluePlayerScore',
    schema: [BlueTeamPlayerScoreSchema],
  });

  if (realm) {
    const res = realm.objects('blue_team_player_score');
    if (res) {
      res.forEach((obj) => {
        let playerSocreArr = [];
        obj.playerScore.map((obj1) => {
          playerSocreArr.push(JSON.parse(obj1));
        });

        let dataObj = {
          _id: obj._id,
          teamId: obj.teamId,
          playerScore: playerSocreArr,
          quarter: obj.quarter,
        };
        resData.push(dataObj);
      });
    }
    realm.close();
    // cb(true, resData);
  }
  const realm1 = await Realm.open({
    path: 'NextUpLocalDB/RedPlayerScore',
    schema: [RedTeamPlayerScoreSchema],
  });

  if (realm1) {
    const res = realm1.objects('red_team_player_score');
    if (res) {
      res.forEach((obj) => {
        let playerSocreArr = [];
        obj.playerScore.map((obj1) => {
          playerSocreArr.push(JSON.parse(obj1));
        });

        let dataObj = {
          _id: obj._id,
          teamId: obj.teamId,
          playerScore: playerSocreArr,
          quarter: obj.quarter,
        };
        resData.push(dataObj);
      });
    }
    realm1.close();
    cb(true, resData);
  }
}

const InitialDataSchema = {
  name: 'initial_data',
  properties: {
    _id: { type: 'int' },
    initialData: { type: 'list', objectType: 'string' },
    activePlayer: { type: 'list', objectType: 'string' },
    isGameStarted: { type: 'bool', optional: true },
    currentQuarter: { type: 'string', optional: true },
  },
  primaryKey: '_id',
};

async function insertInitialData(data) {
  const realm = await Realm.open({
    path: 'NextUpLocalDB/InitialData',
    schema: [InitialDataSchema],
    deleteRealmIfMigrationNeeded: true,
  });

  if (realm) {
    let task;
    realm.write(() => {
      task = realm.create('initial_data', data, 'modified');
      // console.log('team score inserted---');
      // console.log(task._id);
    });
    realm.close();
  }
  realm.close();
}

async function getInitialData(cb) {
  const realm = await Realm.open({
    path: 'NextUpLocalDB/InitialData',
    schema: [InitialDataSchema],
  });

  if (realm) {
    const res = realm.objects('initial_data');
    let dataObj;

    if (res) {
      res.forEach((obj) => {
        dataObj = {
          _id: obj._id,
          initialData: JSON.parse(obj?.initialData[0]),
          activePlayer: JSON.parse(obj?.activePlayer[0]),
          isGameStarted: obj?.isGameStarted,
          currentQuarter: JSON.parse(obj?.currentQuarter),
        };
      });

      if (dataObj != undefined) {
        realm.close();
        cb(true, dataObj);
      } else {
        realm.close();
        cb(false, []);
      }
    } else {
      realm.close();
      cb(false, []);
    }
  }
}

async function getTeamScore(cb) {
  const realm = await Realm.open({
    path: 'NextUpLocalDB/TeamScore',
    schema: [TeamScoreSchema],
  });
  if (realm) {
    const res = realm.objects('team_score');
    if (res) {
      let score_arr = [];
      res.forEach((obj) => {
        let dataObj = {
          _id: obj._id,
          teamId: obj.teamId,
          isChallenger: obj.isChallenger,
          currentScore: obj.currentScore,
          quarter: obj.quarter,
        };
        score_arr.push(dataObj);
      });

      if (score_arr.length > 0) {
        realm.close();
        cb(true, score_arr);
      } else {
        realm.close();
        cb(false, score_arr);
      }
    } else {
      realm.close();
      cb(false, score_arr);
    }
  }
}

async function removeAllLocalData(cb) {
  removeEventData((ev_res) => {
    if (ev_res) {
      removePlayerScore((res) => {
        if (res) {
          removeRedPlayerScore((rd_res) => {
            if (rd_res) {
              removeTeamScore((res1) => {
                if (res1) {
                  removeInitData((res2) => {
                    if (res2) {
                      cb(true);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
}

async function removeEventData(cb) {
  //remove events

  const realm = await Realm.open({
    path: 'NextUpLocalDB/Events',
    schema: [EventSchema],
  });
  if (realm) {
    realm.write(() => {
      realm.deleteAll();
    });
  }
  realm.close();
  cb(true);
}

async function removePlayerScore(cb) {
  const realm = await Realm.open({
    path: 'NextUpLocalDB/BluePlayerScore',
    schema: [BlueTeamPlayerScoreSchema],
  });
  if (realm) {
    realm.write(() => {
      realm.deleteAll();
    });
  }
  realm.close();
  cb(true);
}

async function removeRedPlayerScore(cb) {
  const realm = await Realm.open({
    path: 'NextUpLocalDB/RedPlayerScore',
    schema: [RedTeamPlayerScoreSchema],
  });
  if (realm) {
    realm.write(() => {
      realm.deleteAll();
    });
  }
  realm.close();
  cb(true);
}

async function removeTeamScore(cb) {
  //remove team score
  const realm = await Realm.open({
    path: 'NextUpLocalDB/TeamScore',
    schema: [TeamScoreSchema],
  });
  if (realm) {
    realm.write(() => {
      realm.deleteAll();
    });
  }
  realm.close();
  cb(true);
}

async function removeInitData(cb) {
  //remove team score

  try {
    const realm = await Realm.open({
      path: 'NextUpLocalDB/InitialData',
      schema: [InitialDataSchema],
    });
    if (realm) {
      realm.write(() => {
        realm.deleteAll();
      });
    }
    realm.close();
    cb(true);
  } catch (error) {
    // console.log(error);
  }
}

export {
  insertEvent,
  insertBluePlayerScore,
  insertRedPlayerScore,
  insertTeamScore,
  insertInitialData,
  getEventDataFromRealm,
  getPlayerScoreFromRealm,
  getInitialData,
  getTeamScore,
  removeAllLocalData,
};
