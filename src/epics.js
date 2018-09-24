import { combineEpics } from 'redux-observable';

// Import epics and combine
import feedEpic from './containers/Feed/epic';
import eventEpic from './containers/Viewevent/epics';
import createEventsEpic from './containers/CreateEvent/epics';


const rootEpic = combineEpics(
  feedEpic,
  eventEpic,
  createEventsEpic,
);

export default rootEpic;
