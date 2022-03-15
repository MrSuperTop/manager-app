import { State, StateActions, StateActionTypes } from './types';

export const SelectReducer = <T>(
  state: State<T>,
  action: StateActions<T>
): State<T> => {
  switch (action.type) {
    case StateActionTypes.SET_SELECTED:
      return {
        ...state,
        selected: action.payload
      }
    default:
      return state;
  }
};
