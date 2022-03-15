import { ChevronLeftIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

interface ToggleChevronProps {
  open: boolean
};

const ToggleChevron: React.VFC<ToggleChevronProps> = ({
  open
}) => {
  return (
    <ChevronLeftIcon
      className={classNames(
        'text-gray-400 transition h-5 w-5',
        { 'transform -rotate-90': open }
      )}
    />
  );
};

export default ToggleChevron;
