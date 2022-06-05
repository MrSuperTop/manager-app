import { Meta, Story } from '@storybook/react';
import PinInput, { PinInputProps } from './PinInput';
import { Form, Formik } from 'formik';

export default {
  component: PinInput,
  title: 'Components/Inputs/PinInput'
} as Meta;

const SingleTemplate: Story<PinInputProps> = (args) => {
  return (
    <Formik
      initialValues={{
        code: []
      }}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);
        console.log(data);
        setSubmitting(false);
      }}
    >
      {() => (
        <Form>
          <PinInput
            {...args}
            label='Label'
            numbersCount={6}
            name='code'
          />
        </Form>
      )}
    </Formik>
  );
};

export const Single = SingleTemplate.bind({});