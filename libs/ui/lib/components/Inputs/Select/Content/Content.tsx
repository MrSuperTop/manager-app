import { Listbox } from '@headlessui/react';
import classnames from 'classnames';
import { PropsWithChildren } from 'react';
import Float from '../../../Float/Float';
import ToggleChevron from '../../shared/ToggleChevron';
import { defaultTextFieldClasses } from '../../TextField/TextField';
import { displayValue } from '../Select';
import { useSelectState } from '../state/SelectState';
import { ItemsData } from '../state/types';

interface ContentProps<T extends ItemsData> {
  open: boolean,
  className: string,
  displayValue: displayValue<T[number]>
}

const Content = <T extends ItemsData>({
  open,
  className,
  displayValue,
  children
}: PropsWithChildren<ContentProps<T>>) => {
  const { selected } = useSelectState<T[number]>();

  return (  
    <div
      className={className}
    >
      <Listbox.Button
        className={classnames(
          'flex items-center relative gap-2',
          defaultTextFieldClasses
        )}
      >
        {displayValue(selected)}
        <ToggleChevron
          open={open}
        />
      </Listbox.Button>
      <Float
        open={open}
      >
        {children}
      </Float>
    </div>
  );
};

export default Content;
