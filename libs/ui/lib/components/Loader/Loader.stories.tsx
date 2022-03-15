import { Meta, Story } from '@storybook/react';
import Loader, { LoaderProps } from './Loader';

export default {
  component: Loader,
  title: 'Components/Loader'
} as Meta;

const SingleTemplate: Story<LoaderProps> = (args) => {
  return (
    <Loader
      {...args}
    />
  );
};

export const Single = SingleTemplate.bind({});