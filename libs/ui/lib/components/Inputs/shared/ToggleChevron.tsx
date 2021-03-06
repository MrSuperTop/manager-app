import { ChevronLeftIcon } from '@heroicons/react/outline';
import classnames from 'classnames';

interface ToggleChevronProps {
  open: boolean
};

const ToggleChevron = (
  {
    open
  }: ToggleChevronProps
) => {
  return (
    <ChevronLeftIcon
      className={classnames(
        'text-gray-400 transition h-5 w-5',
        { 'transform -rotate-90': open }
      )}
    />
  );
};

export default ToggleChevron;
