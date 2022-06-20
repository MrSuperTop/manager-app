import { Listbox } from '@headlessui/react';
import { useField } from 'formik';
import { PropsWithChildren, ReactNode, useEffect } from 'react';
import Content from './Content/Content';
import Options from './Options';
import { createSelectStore, ItemData, ItemsData, SelectStateProvider, useSelectState } from './store';

export type displayValue<T extends ItemData> = (data: T) => ReactNode;

export interface SelectProps<T extends ItemData> {
  name: string,
  label?: string,
  defaultValue?: T | null,
  displayValue: displayValue<T>
};

const Select = <T extends ItemsData>({
  name,
  label,
  children,
  defaultValue,
  ...props
}: PropsWithChildren<SelectProps<T[number]>>) => {
  const { selected, setSelected } = useSelectState();
  const { setValue } = useField(name)[2];

  useEffect(() => {
    setValue(defaultValue);
  }, []);

  const selectHandler = (newValue: T[number]) => {
    setSelected(newValue);
    setValue(newValue);
  };

  return (
    <Listbox
      value={selected}
      onChange={selectHandler}
    >
      {({ open }) => {
        return (
          <>
            {label && (
              <Listbox.Label
                className='block text-sm font-medium text-gray-700'
              >
                {label}
              </Listbox.Label>
            )}
            <Content
              className='mt-1 relative'
              open={open}
              {...props}
            >
              {children}
            </Content>
          </>
        );
      }}
    </Listbox>
  );
};

const Wrapper = <T extends ItemsData>({
  children,
  ...props
}: PropsWithChildren<SelectProps<T[number]>>) => {
  return (
    <SelectStateProvider
      createStore={createSelectStore}
      // FIXME
      // customDefaultState={{
      //   selected: props.defaultValue || null
      // }}
    >
      <Select
        {...props}
      >
        {children}
      </Select>
    </SelectStateProvider>
  );
};

export default Object.assign(Wrapper, {
  Options
});
