import { ItemsData } from './state/types';

export interface ControllerProps<T extends ItemsData> {
  children: (data: T[0]) => JSX.Element[] | JSX.Element
};

const Contoller = <T extends ItemsData>({
  children
}: React.PropsWithChildren<ControllerProps<T>>) => {
  return (
    {children}
  );
};

export default Contoller;
