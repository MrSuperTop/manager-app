import { Meta, Story } from '@storybook/react';
import Button from '../Buttons/Button/Button';
import Menu, { MenuProps } from './Menu';

export default {
  component: Menu,
  title: 'Components/Menu'
} as Meta;

const SingleTemplate: Story<MenuProps> = (args) => {
  return (
    <Menu
      {...args}
      className='w-56'
      controller={
        <Button>
          Toggle Menu!
        </Button>
      }
    >
      <Menu.Option>
        Item 1
      </Menu.Option>
      <Menu.Option>
        Item 2
      </Menu.Option>
      <Menu.Option>
        Item 3
      </Menu.Option>
    </Menu>
  );
};

export const Single = SingleTemplate.bind({});
