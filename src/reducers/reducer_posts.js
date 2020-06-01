import _ from 'lodash';
import {FETCH_POSTS, FETCH_POST, DELETE_POST} from '../actions';

export default function(state={}, action){
    switch(action.type){ 
      case DELETE_POST:
           return _.omit(state, action.payload);
       case FETCH_POST:
        //const post = action.payload.data;
        //const newState = { ...state};
       // newState[post.id] = post;
        //return newState;
        // making a new key for the post and returning it with existing state
        return { ...state, [action.payload.data.id]: action.payload.data};
       case FETCH_POSTS:
       return _.mapKeys(action.payload.data,'id');
        default:
          return state;
    }
}