import { FieldInputProps } from 'formik';
import { ChangeEventHandler, FocusEventHandler } from 'react';

interface Handlers<T extends HTMLElement> {
  blurHandler: FocusEventHandler<T>,
  changeHandler: ChangeEventHandler<T>
};

interface CustomHandlers<T extends HTMLElement> {
  onBlur?: FocusEventHandler<T>,
  onChange?: ChangeEventHandler<T>
};

const useCustomFormikHandlers = <T extends HTMLElement>(
  field: FieldInputProps<Record<string, unknown>>,
  { onBlur, onChange }: CustomHandlers<T>
) => {
  const changeHandler: Handlers<T>['changeHandler'] = (
    event
  ) => {
    field.onChange(event);

    if (!onChange) return;

    onChange(event);
  };

  const blurHandler: Handlers<T>['blurHandler'] = (
    event
  ) => {
    field.onBlur(event);

    if (!onBlur) return;

    onBlur(event);
  };

  return {
    changeHandler,
    blurHandler
  };
};

export default useCustomFormikHandlers;
