import { ButtonGroupContext, defaultState } from './state/ButtonGroupContext';
import { SharedProps } from './state/types';

export type GroupProps = Partial<SharedProps>;


const Group = (
  {
    children
  }: GroupProps
) => {
  return (
    <div
      className='components-group flex flex-row'
    >
      {children}
    </div>
  );
};

const Wrapper = (
  {
    children,
    ...props
  }: GroupProps
) => {
  return (
    <ButtonGroupContext.Provider
      value={{
        sharedProps: {
          ...defaultState.sharedProps,
          ...props
        }
      }}
    >
      <Group
        {...props}
      >
        {children}
      </Group>
    </ButtonGroupContext.Provider>
  );
};

export default Wrapper;
