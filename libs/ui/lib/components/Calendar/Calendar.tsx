import classnames from 'classnames';
import { Dayjs } from 'dayjs';
import { range } from 'lodash-es';
import { ComponentPropsWithoutRef, useMemo } from 'react';
import Day, { selectHandler } from './Day/Day';

interface CalendarProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  displayMonth: Dayjs,
  selected: Dayjs,
  onSelect: selectHandler
};

const firstSuToFirstMo = (weekdayNumber: number) => {
  switch (weekdayNumber) {
    case 0:
      return 6;
    default:
      return weekdayNumber - 1;
  }
};

const Calendar = (
  {
    displayMonth,
    onSelect,
    selected,
    className,
    children,
    ...props
  }: CalendarProps
) => {
  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const days: Dayjs[] = useMemo(() => {
    const result: Dayjs[] = [];

    const prevMonth = displayMonth.subtract(1, 'month');
    const nextMonth = displayMonth.add(1, 'month');

    const firstDayOfWeekThisMonth = firstSuToFirstMo(displayMonth.startOf('month').day());

    for (const i of range(prevMonth.daysInMonth() - firstDayOfWeekThisMonth + 1, prevMonth.daysInMonth() + 1)) {
      result.push(prevMonth.date(i));
    }

    for (const i of range(1, displayMonth.daysInMonth() + 1)) {
      result.push(displayMonth.date(i));
    }

    const daysToFill = result.length < 35 ? 14 - result.length % 7 : 7 - result.length % 7;

    for (const i of range(1, daysToFill + 1)) {
      result.push(nextMonth.date(i));
    }

    return result;
  }, [displayMonth]);

  return (
    <div
      className={classnames(
        className,
        'w-[20rem]'
      )}
      {...props}
    >
      <div
        className='mb-2'
      >
        {children}
      </div>
      <div>
        <div
          className='grid grid-cols-7 text-center'
        >
          {weekDays.map((name, index) => (
            <div
              key={index}
              className='text-gray-500'
            >
              {name}
            </div>
          ))}
        </div>
        <div
          className='grid grid-cols-7 justify-center'
        >
          {days.map((day, i) => (
            <Day
              key={day.unix()}
              selected={selected}
              currentMonth={displayMonth.month()}
              onSelect={onSelect}
              date={day}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
