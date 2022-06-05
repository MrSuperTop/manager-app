import { Popover } from '@headlessui/react';
import classnames from 'classnames';
import { useField } from 'formik';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import Float from '../../Float/Float';

export interface ColorPickerProps {
  name: string,
  startColor?: string
};

const ColorPicker = (
  {
    name,
    startColor = '#ffffff'
  }: ColorPickerProps
) => {
  const [color, setColor] = useState(startColor);
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
            className={classnames(
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
