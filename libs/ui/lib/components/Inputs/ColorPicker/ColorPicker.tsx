import { Popover } from '@headlessui/react';
import classNames from 'classnames';
import { useField } from 'formik';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import Float from '../shared/Float';

export interface ColorPickerProps {
  name: string
};

const ColorPicker: React.VFC<ColorPickerProps> = ({
  name
}) => {
  const [color, setColor] = useState('#aabbcc');
  const { setValue } = useField(name)[2];

  const updateHandler = (newValue: string) => {
    setValue(newValue);
    setColor(newValue);
  };

  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              'h-8 w-8 focus:ring ring-offset-2 rounded-md transition'
            )}
            style={{
              backgroundColor: color
            }}
          />

            <Popover.Panel
              static
            >
              <Float
                open={open}
              >
                  <HexColorPicker
                    color={color}
                    onChange={updateHandler}
                  />
              </Float>
            </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default ColorPicker;
