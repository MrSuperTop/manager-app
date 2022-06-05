import { Switch } from '@headlessui/react';
import classnames from 'classnames';
import { useField } from 'formik';
import Label from '../shared/Label';

export interface ToggleProps {
  name: string,
  label?: string
};

const Toggle = (
  {
    name,
    label
  }: ToggleProps
) => {
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
        className={classnames(
          'relative inline-flex items-center h-6 rounded-full w-11',
          enabled ? 'bg-primary' : 'bg-gray-200'
        )}
      >
        <span
          className={classnames(
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
