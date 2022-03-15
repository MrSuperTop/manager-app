import { Meta, Story } from '@storybook/react';
import { pick } from 'lodash-es';
import { defaultIcon, getIconSelect } from '../../../utils/storybookIconsSelect';
import { colorSchemes, variants } from '../Button/Button';
import { Single as ButtonSingle } from '../Button/Button.stories';
import IconButton, { IconButtonProps, sizes } from './IconButton';

export default {
  component: IconButton,
  title: 'Components/Buttons/IconButton'
} as Meta;

const SingleTemplate: Story<IconButtonProps> = (args) => {
  return (
    <IconButton
      {...args}
    />
  );
};

export const Single = SingleTemplate.bind({});
Single.args = {
  icon: defaultIcon
};

Single.argTypes = {
  ...pick(ButtonSingle.argTypes, ['variant', 'size']),
  icon: getIconSelect('Icon to be displayed isnside a button')
};

export const Sizes = () => {
  return (
    <div
      className='flex items-start gap-2'
    >
      {sizes.map((size, index) => (
        <IconButton
          icon={defaultIcon}
          key={index}
          size={size}
        />
      ))}
    </div>
  );
};

export const Variants = () => {
  return (
    <div
      className='grid gap-2 [grid-template-columns:fit-content(10em)_fit-content(10em)]'
    >
      {variants.map((vatiant, i) => {
        return colorSchemes.map((colorSheme, j) => (
          <IconButton
            key={`${i}_${j}`}
            icon={defaultIcon}
            size='md'
            colorScheme={colorSheme}
            variant={vatiant}
          >
            Click Me!
          </IconButton>
        ));
      })}
    </div>
  );
};
