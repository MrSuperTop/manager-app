import { PlusIcon } from '@heroicons/react/outline';
import { Meta, Story } from '@storybook/react';
import { IconType } from '../../../types/Icon';
import { defaultIcon, getIconSelect } from '../../../utils/storybookIconsSelect';
import IconButton from '../IconButton/IconButton';
import Button, { ButtonProps, colorSchemes, sizes, variants } from './Button';
import { GroupProps } from './Group/Group';

export default {
  component: Button,
  title: 'Components/Buttons/Button'
} as Meta;

interface SingleProps extends ButtonProps {
  text: string,
  icon: IconType
};

const Template: Story<SingleProps> = (args) => {
  return (
    <Button
      {...args}
    >
      {args.text}
    </Button>
  );
};

export const Single = Template.bind({});
Single.args = {
  text: 'Click Me!'
};

Single.argTypes = {
  text: {
    description: 'Text inside the button'
  },
  variant: {
    control: { type: 'select' },
    defaultValue: 'default',
    description: 'Variant of the button'
  },
  colorScheme: {
    control: { type: 'select' },
    defaultValue: 'primary',
    description: 'Color scheme'
  },
  size: {
    control: { type: 'select' },
    defaultValue: 'md',
    description: 'Controls width, height and font-size'
  },
  isLoading: {
    description: 'Whether you want your button to be in a loading state'
  },
  leftIcon: getIconSelect('Icon to be displayed inside a button on the left'),
  rightIcon: getIconSelect('Icon to be displayed inside a button on the right')
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Single.args,
  leftIcon: defaultIcon
};

WithIcon.argTypes = {
  ...Single.argTypes
};


export const Sizes = () => {
  return (
    <div  
      className='flex items-start gap-2'
    >
      {sizes.map((size, index) => (
        <Button
          key={index}
          size={size}
        >
          Click Me!
        </Button>
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
          <Button
            key={`${i}_${j}`}
            size='md'
            colorScheme={colorSheme}
            variant={vatiant}
          >
            Click Me!
          </Button>
        ));
      })}
    </div>
  );
};

const ButtonGroupTemplate: Story<GroupProps> = (args) => {
  return (
    <Button.Group
      {...args}
    >
      <Button>Add</Button>
      <Button>Remove</Button>
      <IconButton
        icon={<PlusIcon />}
      ></IconButton>
    </Button.Group>
  );
};

export const ButtonGroup = ButtonGroupTemplate.bind({});
ButtonGroup.argTypes = {};

ButtonGroup.args = {
  variant: 'outline'
};
