import { Meta, Story } from '@storybook/react';
import { Form, Formik } from 'formik';
import Toggle, { ToggleProps } from './Toggle';

export default {
  component: Toggle,
  title: 'Components/Inputs/Toggle'
} as Meta;

const SingleTemplate: Story<ToggleProps> = (args) => {
  return (
    <Formik
      initialValues={{
        isEnabled: ''
      }}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);
        console.log(data);
        setSubmitting(false);
      }}
    >
      {() => (
        <Form>
          <Toggle
            {...args}
            name='isEnabled'
          />
        </Form>
      )}
    </Formik>
  );
};

export const Single = SingleTemplate.bind({});
Single.args = {
  label: 'Label'
};