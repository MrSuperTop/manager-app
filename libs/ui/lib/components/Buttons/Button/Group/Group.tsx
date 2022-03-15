import { ButtonGroupContext, defaultState } from './state/ButtonGroupContext';
import { SharedProps } from './state/types';

export type GroupProps = Partial<SharedProps>;


const Group: React.FC<GroupProps> = ({
  children
}) => {
  return (
    <div
      className='components-group flex flex-row'
    >
      {children}
    </div>
  );
};

const Wrapper: React.FC<GroupProps> = ({
  children,
  ...props
}) => {
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
