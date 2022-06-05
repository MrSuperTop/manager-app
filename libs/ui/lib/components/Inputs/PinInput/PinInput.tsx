import { useField } from 'formik';
import { every } from 'lodash-es';
import { createRef, PropsWithChildren, useMemo } from 'react';
import ErrorText from '../shared/ErrorText';
import Label from '../shared/Label';
import Number, { ChangeHandler, PressHandler } from './Number/Number';

export interface PinInputProps {
  name: string,
  numbersCount: number,
  label?: string,
  required?: boolean
};

const NUMBERS = [...Array(10).keys()];
const NUMERIC_REGEX = /^[0-9]+$/;

const validate = (value: string) => {
  return NUMERIC_REGEX.test(value);
};

const PinInput = ({
  name,
  required,
  label,
  numbersCount
}: PropsWithChildren<PinInputProps>) => {
  const [{ value },, { setValue }] = useField<string[]>(name);
  const refs = useMemo(() => (
    Array(numbersCount)
      .fill(0)
      .map(() => createRef<HTMLInputElement>())
  ), [numbersCount]);

  const changeHandler: ChangeHandler = (
    event,
    index,
    oldValue
  ) => {
    const nextElement = refs[index + 1];
    const inputValue = event.currentTarget.value;
    const char = inputValue[inputValue.length - 1];

    if (inputValue.length === numbersCount) {
      const isNumbers = every(inputValue.split(''), (item) => {
        return NUMBERS.includes(parseInt(item));
      });

      if (isNumbers) {
        setValue(inputValue.split(''));
      }

      return;
    }

    const newValue = Array.from(value);
    newValue[index] = char;

    if (!validate(newValue.join(''))) {
      return;
    }

    setValue(newValue);

    if (!nextElement || oldValue !== '') {
      return;
    }

    nextElement.current?.focus();
  };

  const pressHandler: PressHandler = (
    event,
    index,
    oldValue
  ) => {
    if (event.code !== 'Backspace') {
      return;
    }

    const prevElement = refs[index - 1];

    if (!prevElement || oldValue !== '') {
      return;
    }

    prevElement.current?.focus();
  };

  return (
    <div
      className='flex flex-col gap-1 w-full'
    >
      <Label
        required={required}
        htmlFor={name}
      >
        {label}
      </Label>
      <div
        className='flex gap-2 flex-start'
      >
        {Array(numbersCount).fill(0).map((_, index) => {
          const numberValue = value[index] ? value[index] : '';

          return (
            <Number
              key={index}
              onChange={changeHandler}
              onKeyDown={pressHandler}
              id={name}
              value={numberValue}
              index={index}
              ref={refs[index]}
            />
          );
        })}
      </div>
      <ErrorText
        name={name}
      />
    </div>
  );
};

export default PinInput;
