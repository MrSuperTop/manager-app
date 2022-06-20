import { ItemsData } from './store';

export interface ControllerProps<T extends ItemsData> {
  children: (data: T[0]) => JSX.Element[] | JSX.Element
};

const Contoller = <T extends ItemsData>({
  children
}: ControllerProps<T>) => {
  return (
    {children}
  );
};

export default Contoller;
