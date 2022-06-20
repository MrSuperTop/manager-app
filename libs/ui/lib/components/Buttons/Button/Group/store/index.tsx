import create from 'zustand';
import createContext from 'zustand/context';
import { ButtonProps } from '../../Button';

export type SharedProps = Required<Pick<ButtonProps, 'variant' | 'colorScheme'>>;

export interface State {
  sharedProps: SharedProps
}

export const createButtonGroupStore = (defaultSharedProps: SharedProps) => (
  () => create<State>(() => ({
    sharedProps: defaultSharedProps
  }))
);

type Store = ReturnType<ReturnType<typeof createButtonGroupStore>>;

const {
  Provider: ButtonGroupContextProvider,
  useStore
} = createContext<Store>();

export const useButtonGroupState = () => {
  try {
    return useStore((state) => state.sharedProps);
  } catch (error) {
    return null;
  }
};

export {
  ButtonGroupContextProvider
};
