import create from 'zustand';
import createContext from 'zustand/context';

export interface ItemData {
  id: string
}

export type ItemsData = ItemData[];

export interface State<T extends ItemData> {
  selected: T | null,
  setSelected: (selected: T) => void;
}

export const createSelectStore = <T extends ItemData>() => (
  create<State<T>>((set) => ({
    selected: null,
    setSelected: (selected) => set(() => ({ selected }))
  }))
);

const {
  Provider: SelectStateProvider,
  useStore: useSelectState
} = createContext<ReturnType<typeof createSelectStore>>();

export {
  SelectStateProvider,
  useSelectState
};

