import { LockClosedIcon } from '@heroicons/react/solid';
import { Meta, Story } from '@storybook/react';
import { Form, Formik } from 'formik';
import { Single as SingleTextField } from '../TextField/TextField.stories';
import TextArea, { TextAreaProps } from './TextArea';

export default {
  component: TextArea,
  title: 'Components/Inputs/TextArea'
} as Meta;

const SingleTemplate: Story<TextAreaProps> = (args) => {
  return (
    <Formik
      initialValues={{
        text: ''
      }}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);
        console.log(data);
        setSubmitting(false);
      }}
    >
      {() => (
        <Form>
          <TextArea
            {...args}
            name='text'
          />
        </Form>
      )}
    </Formik>
  );
};

export const Single = SingleTemplate.bind({});

Single.argTypes = {
  ...SingleTextField.argTypes,
  resize: {
    description: 'Controls the way user will be able to control size of the TextArea',
    control: { type: 'select' }
  }
};

Single.args = {
  placeholder: 'Placeholder',
  label: 'Label'
};

const WithInnerElementTemplate: Story<TextAreaProps> = (args) => {
  return (
    <Formik
      initialValues={{
        text: ''
      }}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);
        console.log(data);
        setSubmitting(false);
      }}
    >
      {() => (
        <Form>
          <TextArea
            {...args}
            name='text'
          >
            <TextArea.InnerLeft
              width={20}
            >
              <div
                className='h-5 w-5'
              >
                <LockClosedIcon />
              </div>
            </TextArea.InnerLeft>
          </TextArea>
        </Form>
      )}
    </Formik>
  );
};

export const WithInnerElement = WithInnerElementTemplate.bind({});

WithInnerElement.argTypes = Single.argTypes;
WithInnerElement.args = Single.args;
