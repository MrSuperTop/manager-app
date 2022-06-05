import classnames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { MouseEventHandler } from 'react';

export type selectHandler = (selected: Dayjs) => void;

interface DayProps {
  date: Dayjs,
  currentMonth: number,
  onSelect: selectHandler,
  selected: Dayjs
};

const formatForCheck = 'DD-MM-YYYY';
const compareDays = (firstDay: Dayjs, secondDay: Dayjs) => {
  return firstDay.format(formatForCheck) === secondDay.format(formatForCheck);
};

const Day = (
  {
    date,
    onSelect,
    currentMonth,
    selected
  }: DayProps
) => {
  const clickHandler: MouseEventHandler<HTMLDivElement> = () => {
    onSelect(date);
  };

  const isSelected = compareDays(selected, date);
  const isToday = compareDays(date, dayjs());
  const isOutside = date.month() !== currentMonth;

  return (
    <div
      onClick={clickHandler}
      key={date.unix()}
      className={classnames(
        'w-10 h-10 transition duration-75 hover:bg-primary hover:text-white rounded-md flex items-center justify-center cursor-pointer',
        { 'text-gray-500': isOutside },
        { 'hover:bg-secondary bg-secondary text-white duration-200': isSelected },
        { 'bg-secondary-600': isSelected && isOutside },
        { 'border border-gay-200': isToday }
      )}
    >
      {date.date()}
    </div>
  );
};

export default Day;
