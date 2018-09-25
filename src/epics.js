import { combineEpics } from 'redux-observable';

// Import epics and combine
import feedEpic from './containers/Feed/epic';
import eventEpic from './containers/Viewevent/epics';
import createEventsEpic from './containers/CreateEvent/epics';
import userEpic from './containers/User/epics';


const rootEpic = combineEpics(
  feedEpic,
  eventEpic,
  createEventsEpic,
  userEpic,
);

export default rootEpic;
