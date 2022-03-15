import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import { useField } from 'formik';
import Label from '../shared/Label';

export interface ToggleProps {
  name: string,
  label?: string
};

const Toggle: React.VFC<ToggleProps> = ({
  name,
  label
}) => {
  const [{
    value: enabled
  },, { setValue, setTouched }] = useField(name);

  const selectHandler = (enabled: boolean) => {
    setValue(enabled);
    setTouched(true);
  };
  
  return (
    <div
      className='flex items-center space-x-2'
    >
      <Switch
        checked={enabled}
        onChange={selectHandler}
        className={classNames(
          'relative inline-flex items-center h-6 rounded-full w-11',
          enabled ? 'bg-primary' : 'bg-gray-200'
        )}
      >
        <span
          className={classNames(
            'inline-block w-4 h-4 transform bg-white rounded-full transition',
            enabled ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </Switch>
      <Label
        className='block align-middle h-full'
      >
        {label}
      </Label>
    </div>
  );
};

export default Toggle;
