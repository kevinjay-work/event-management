import { combineReducers } from 'redux';
import {event} from './event'

const rootReducer = combineReducers({
    event:event
});

export default rootReducer;