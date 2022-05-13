import { GET_USER, DISABLE_USER, ENABLE_USER, UPDATE_USER } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;

    case DISABLE_USER:
      return {
        ...state,
        active: action.payload,
      };
    case ENABLE_USER:
      return {
        ...state,
        active: action.payload,
      };
      case UPDATE_USER:
        return {
          ...state
        };

    default:
      return state;
  }
}
