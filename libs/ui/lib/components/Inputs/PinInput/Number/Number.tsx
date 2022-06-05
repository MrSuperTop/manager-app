import classnames from 'classnames';
import { FormEvent, FormEventHandler, forwardRef, KeyboardEventHandler, KeyboardEvent, PropsWithChildren, FocusEventHandler, useState, ComponentPropsWithoutRef } from 'react';
import { defaultTextFieldClasses } from '../../TextField/TextField';

export type ChangeHandler = (
  event: FormEvent<HTMLInputElement>,
  index: number,
  oldValue: string
) => void;

export type PressHandler = (
  event: KeyboardEvent<HTMLInputElement>,
  index: number,
  oldValue: string
) => void;

type NeededProps = Omit<ComponentPropsWithoutRef<'input'>, 'onChange' | 'onKeyDown'>;

export interface NumberProps extends NeededProps {
  index: number,
  value: string,
  onChange: ChangeHandler,
  onKeyDown: PressHandler
};

const Number = forwardRef<HTMLInputElement, NumberProps>(({
  index,
  value,
  onKeyDown,
  onChange,
  ...props
}: PropsWithChildren<NumberProps>, ref) => {
  const [oldValue, setOldValue] = useState<string>('');

  const changeHandler: FormEventHandler<HTMLInputElement> = (event) => {
    onChange(event, index, oldValue);

    setOldValue(event.currentTarget.value);
  };

  const pressHandler: KeyboardEventHandler<HTMLInputElement> = (event) => {
    onKeyDown(event, index, oldValue);
  };

  const focusHandler: FocusEventHandler<HTMLInputElement> = (event) => {
    event.target.select();
  };

  return (
    <input
      ref={ref}
      className={classnames(
        defaultTextFieldClasses,
        'h-10 w-10 text-center'
      )}
      value={value}
      onChange={changeHandler}
      onKeyDown={pressHandler}
      onFocus={focusHandler}
      {...props}
    ></input>
  );
});

export default Number;
