import { Meta, Story } from '@storybook/react';
import PasswordField, { PasswordFieldProps } from './PasswordField';
import { Form, Formik } from 'formik';

export default {
  component: PasswordField,
  title: 'Components/Inputs/PasswordField'
} as Meta;

const SingleTemplate: Story<PasswordFieldProps> = (args) => {
  return (
    <Formik
      initialValues={{
        password: ''
      }}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);
        console.log(data);
        setSubmitting(false);
      }}
    >
      {() => (
        <Form>
          <PasswordField
            {...args}
            label='Label'
            name='password'
          />
        </Form>
      )}
    </Formik>
  );
};

export const Single = SingleTemplate.bind({});
