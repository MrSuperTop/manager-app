import { Meta, Story } from '@storybook/react';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import Datepicker, { DatepickerProps } from './Datepicker';

export default {
  component: Datepicker,
  title: 'Components/Inputs/Datepicker'
} as Meta;

const SingleTemplate: Story<DatepickerProps> = (args) => {
  return (
    <Formik
      initialValues={{
        date: dayjs()
      }}
      onSubmit={(
        data,
        { setSubmitting }
      ) => {
        setSubmitting(true);
        console.log(data);
        setSubmitting(false);
      }}
    >
      {() => (
        <Form>
          <Datepicker
            {...args}
            name='date'
          />
        </Form>
      )}
    </Formik>
  );
};

export const Single = SingleTemplate.bind({});