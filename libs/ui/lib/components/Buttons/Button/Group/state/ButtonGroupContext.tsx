import { createContext, useContext } from 'react';
import { ContextValue, State } from './types';

export const defaultState: State = {
  sharedProps: {
    variant: 'default',
    colorScheme: 'primary'
  }
};

export const ButtonGroupContext = createContext<ContextValue>(
  defaultState as ContextValue
);

export const useButtonGroupState = () => {
  const state = useContext(ButtonGroupContext);

  return state;
};

ButtonGroupContext.displayName = 'ButtonGroupContext';
