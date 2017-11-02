import { combineReducers } from 'redux';

const options = (state = {}, action) => {
  switch (action.type) {
  case 'SET_OPTION':
    return {
      ...state,
      [action.name]: action.value,
    };
  default:
    return state;
  }
};

export default combineReducers({
  options,
});
