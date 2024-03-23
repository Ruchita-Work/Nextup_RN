import React, { useContext } from 'react';
import VSCard1 from '../../../components/games/LiveGame/VSCard1';
import VSCard2 from '../../../components/games/LiveGame/VSCard2';
import { LiveGameContext } from '.';
import moment from 'moment';

export default function GameHeader() {
  const { isGameCompleted, data } = useContext(LiveGameContext);
  const title = moment(data?.scheduledAt).format('MMM DD,HH:MM');

  return !isGameCompleted ? (
    <VSCard1 title={title} />
  ) : (
    <VSCard2 title={title} />
  );
}
