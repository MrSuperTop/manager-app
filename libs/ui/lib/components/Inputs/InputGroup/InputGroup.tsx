import { PropsWithChildren } from 'react';
import Label from '../shared/Label';

export const inputGroupItemClasses = 'deep-group-item:border-l-0 deep-group-item:border-r deep-group-item:rounded-none';
export interface InputGroupProps {
  label?: string
}

const InputGroup = (
  {
    label,
    children
  }: PropsWithChildren<InputGroupProps>
) => {
  return (
    <>
      <Label>{label}</Label>
      <div className='components-group flex flex-row relative'>
        {children}
      </div>
    </>
  );
};

export default InputGroup;
