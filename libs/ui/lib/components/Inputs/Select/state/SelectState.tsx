import { PropsWithChildren, Reducer, useContext, useReducer } from 'react';
import { SelectReducer } from './reducer';
import { defaultState, SelectContext } from './SelectContext';
import { ContextValue, Selected, State, StateActions, StateActionTypes, StateFunctions } from './types';

interface SelectStateProps<T extends Selected> {
  customDefaultState?: State<T>
};

export const SelectState = <T extends Selected>({
  customDefaultState,
  children 
}: PropsWithChildren<SelectStateProps<T>>) => {
  const [state, dispatch] = useReducer<Reducer<State<T>, StateActions<T>>>(
    SelectReducer,
    customDefaultState || defaultState
  );

  const setSelected: StateFunctions<T>['setSelected'] = (selected) => {
    dispatch({
      type: StateActionTypes.SET_SELECTED,
      payload: selected
    });
  };

  const value: Required<ContextValue<T>> = {
    setSelected,
    ...state
  };

  return (
    <SelectContext.Provider
      value={value}
    >
      {children}
    </SelectContext.Provider>
  );
};

export const useSelectState = <T extends Selected>(): Required<ContextValue<T>> => {
  const state = useContext(SelectContext);

  return state;
};

export default SelectState;
