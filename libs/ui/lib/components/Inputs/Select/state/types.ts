export interface ItemData {
  id: string
}

export type ItemsData = ItemData[];
export type Selected<T extends ItemData = ItemData> = T | null;

export enum StateActionTypes {
  'SET_SELECTED'
}

export interface StateFunctions<T> {
  setSelected: (selected: T) => void;
}

export type StateActions<T> = 
  | { type: StateActionTypes.SET_SELECTED, payload: T };

export interface State<T> {
  selected: T
}

export type ContextValue<T> = State<T> & StateFunctions<T>;

