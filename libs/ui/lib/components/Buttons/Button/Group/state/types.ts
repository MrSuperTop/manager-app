import { ButtonProps } from '../../Button';

export type SharedProps = Required<Pick<ButtonProps, 'variant' | 'colorScheme'>>;

export interface State {
  sharedProps: SharedProps
}

export type ContextValue = State;

