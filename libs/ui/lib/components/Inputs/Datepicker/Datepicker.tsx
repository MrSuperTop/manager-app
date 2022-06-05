import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline';
import dayjs, { Dayjs } from 'dayjs';
import { useField } from 'formik';
import { useState } from 'react';
import IconButton from '../../Buttons/IconButton/IconButton';
import Calendar from '../../Calendar/Calendar';
import { selectHandler } from '../../Calendar/Day/Day';

export interface DatepickerProps {
  name: string
};

const Datepicker = (
  {
    name
  }: DatepickerProps
) => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [{ value: selected },, { setValue }] = useField(name);

  const incrementMonth = () => {
    setCurrentMonth((prev) => prev.add(1, 'month'));
  };

  const decrementMonth = () => {
    setCurrentMonth((prev) => prev.subtract(1, 'month'));
  };

  const dateSelectHandler: selectHandler = (date) => {
    setValue(date);
  };

  return (
    <Calendar
      selected={selected}
      onSelect={dateSelectHandler}
      displayMonth={currentMonth}
    >
      <div
        className='flex items-center justify-between px-2'
      >
        <IconButton
          onClick={decrementMonth}
          variant='outline'
          icon={<ArrowLeftIcon />}
        />
        <div>{currentMonth.format('MMMM YYYY')}</div>
        <IconButton
          onClick={incrementMonth}
          variant='outline'
          icon={<ArrowRightIcon />}
        />
      </div>
    </Calendar>
  );
};

export default Datepicker;
