import { Meta, Story } from '@storybook/react';
import { Formik, Form } from 'formik';
import ColorPicker, { ColorPickerProps } from './ColorPicker';

export default {
  component: ColorPicker,
  title: 'Components/Inputs/ColorPicker'
} as Meta;

const SingleTemplate: Story<ColorPickerProps> = (args) => {
  return (
    <Formik
      initialValues={{
        color: ''
      }}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);
        console.log(data);
        setSubmitting(false);
      }}
    >
      {() => (
        <Form>
          <ColorPicker
            name='color'
          />
        </Form>
      )}
    </Formik>
  );
};

export const Single = SingleTemplate.bind({});