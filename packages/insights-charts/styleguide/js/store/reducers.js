import { combineReducers } from 'redux';

const options = (state = {}, action) => {
  switch (action.type) {
    case 'SET_OPTIONS':
      return {
        ...state,
        ...action.payload.options,
      };
    default:
      return state;
  }
};

export default combineReducers({
  options,
});
