import { createContext } from 'react';
import { ContextValue, State } from './types';

export const defaultState: State<any> = {
  selected: null
};

export const SelectContext = createContext<ContextValue<any>>(
  defaultState as ContextValue<any>
);

SelectContext.displayName = 'SelectContext';
