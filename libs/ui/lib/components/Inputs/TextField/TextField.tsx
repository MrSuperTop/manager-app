import { XIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { useField } from 'formik';
import { ComponentPropsWithoutRef, forwardRef, useRef } from 'react';
import useChildrenWithProps from '../../../hooks/useChildrenWithProps';
import useCustomFormikHandlers from '../../../hooks/useCustomFormikHandlers';
import { mergeRefs } from '../../../utils/mergeRefs';
import { inputGroupItemClasses } from '../InputGroup/InputGroup';
import ErrorText from '../shared/ErrorText';
import Label from '../shared/Label';
import { InnerProps } from '../shared/withInner/withInner';
import Addon from './Addon';
import InnerLeft from './InnerLeft';
import InnerRight from './InnerRight';

const InputGroupStyles = 'deep-group-item:group-first:rounded-l-md deep-group-item:group-first:border-l deep-group-item:group-last:rounded-r-md deep-group-item:group-last:border-r';
export const defaultTextFieldClasses = 'px-3 py-2.5 w-full text-base text-black transition focus:outline-none focus:ring focus:outline-none focus:ring focus:ring-opacity-75 transition focus:ring-offset-2 border-gray-300 shadow-sm rounded-md border';

export interface TextFieldProps extends ComponentPropsWithoutRef<'input'> {
  name: string,
  label?: string,
  isClearable?: boolean
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({
  isClearable = false,
  name,
  label,
  className,
  onChange,
  onBlur,
  children,
  ...props
}, ref) => {
  const [field,, { setValue }] = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);
  const { changeHandler, blurHandler } = useCustomFormikHandlers(
    field,
    { onChange, onBlur }
  );

  const childrenWithRef = useChildrenWithProps<InnerProps>(children, {
    parentRef: inputRef
  });

  const clearHandler = () => {
    setValue('');
  };

  return (
    <div className='w-full group'>
      <Label
        htmlFor={name}
      >
        {label}
      </Label>

      <div className='relative flex flex-row w-full'>
        {childrenWithRef}
        {isClearable && (
          <InnerRight
            className='cursor-pointer'
          >
            <button
              onClick={clearHandler}
              className="h-5 w-5 focus:ring ring-primary ring-opacity-50 z-10 p-.5 rounded-md transition"
            >
              <XIcon />
            </button>
          </InnerRight>
        )}
        <input
          {...field}
          {...props}
          id={name}
          ref={mergeRefs(inputRef, ref)}
          onChange={changeHandler}
          onBlur={blurHandler}
          className={classNames(
            defaultTextFieldClasses,
            InputGroupStyles,
            inputGroupItemClasses,
            className
          )}
        />
      </div>

      <ErrorText
        name={name}
      />
    </div>
  );
});

export default Object.assign(TextField, {
  Addon,
  InnerLeft,
  InnerRight,
  Label
});
