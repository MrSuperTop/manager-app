import { Popover } from '@headlessui/react';
import { useField } from 'formik';
import Datepicker from '../Datepicker/Datepicker';
import Float from '../shared/Float';
import ToggleChevron from '../shared/ToggleChevron';
import TextField from '../TextField/TextField';

export interface DatepickerInputProps {
  name: string
};

const DatepickerInput: React.VFC<DatepickerInputProps> = ({
  name
}) => {
  const [{ value: selected }] = useField(name);

  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            className='w-full focus:ring ring-offset-2 rounded-md transition'
          >
            <TextField
              className='cursor-pointer'
              name={name}
              placeholder='Select date...'
              value={selected?.format('YYYY-MM-DD')}
            >
              <TextField.InnerRight>
                <ToggleChevron
                  open={open}
                />
              </TextField.InnerRight>
            </TextField>
          </Popover.Button>
          <Float
            className='mt-2 absolute'
            open={open}
          >
            <Popover.Panel
              static
            >
              <div
                className='bg-white shadow-lg rounded-lg p-4'
              >
                <Datepicker
                  name={name}
                />  
              </div>
            </Popover.Panel>
          </Float>
        </>
      )}
    </Popover>
  );
};

export default DatepickerInput;
