import { AUTH, LOGOUT, FETCH_AUTH } from '../constants/actionTypes';

export default (state = {authData:null} , action) => {
  switch (action.type) {
    case AUTH:
        console.log({...action.data});
        localStorage.setItem('profile', JSON.stringify({...action.data}));
        return { ...state, authData: action.data };
    case FETCH_AUTH:
        return { ...state, authData: JSON.parse(localStorage.getItem("profile")) };
    case LOGOUT:
        localStorage.clear();
        return { ...state, authData: null };
    default:
      return state;
  }
};