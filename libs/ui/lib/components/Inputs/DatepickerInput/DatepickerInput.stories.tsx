import { Meta, Story } from '@storybook/react';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import DatepickerInput, { DatepickerInputProps } from './DatepickerInput';

export default {
  component: DatepickerInput,
  title: 'Components/Inputs/DatepickerInput'
} as Meta;

const SingleTemplate: Story<DatepickerInputProps> = (args) => {
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
          <DatepickerInput
            {...args}
            name='date'
          />
        </Form>
      )}
    </Formik>
  );
};

export const Single = SingleTemplate.bind({});