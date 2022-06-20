import { PropsWithChildren } from 'react';
import { ButtonGroupContextProvider, createButtonGroupStore, SharedProps, State } from './store';

export type GroupProps = Partial<SharedProps>;


const Group = (
  {
    children
  }: PropsWithChildren<GroupProps>
) => {
  return (
    <div
      className='components-group flex flex-row'
    >
      {children}
    </div>
  );
};

const DEFAULT_STATE: State['sharedProps'] = {
  colorScheme: 'primary',
  variant: 'default'
};

const Wrapper = (
  {
    children,
    ...props
  }: PropsWithChildren<GroupProps>
) => {
  return (
    <ButtonGroupContextProvider
      createStore={
        createButtonGroupStore({
          ...DEFAULT_STATE,
          ...props
        })
      }
    >
      <Group
        {...props}
      >
        {children}
      </Group>
    </ButtonGroupContextProvider>
  );
};

export default Wrapper;
