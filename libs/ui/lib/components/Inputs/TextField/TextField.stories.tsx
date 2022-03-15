import { EyeIcon, LockClosedIcon } from '@heroicons/react/solid';
import { Meta, Story } from '@storybook/react';
import { Form, Formik } from 'formik';
import { omit } from 'lodash-es';
import { z } from 'zod';
import { zodAdapter } from '../../../utils/zodAdapter';
import InputGroup from '../InputGroup/InputGroup';
import TextField, { TextFieldProps } from './TextField';

export default {
  component: TextField,
  title: 'Components/Inputs/TextField'
} as Meta;

const Template: Story<TextFieldProps> = (args) => {
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
          <TextField
            {...args}
            name='text'
          />
        </Form>
      )}
    </Formik>
  );
};

export const Single = Template.bind({});

Single.argTypes = {
  placeholder: {
    description: 'Placeholder',
    table: {
      type: { 
        summary: 'string'
      }
    }
  },
  label: {
    description: 'Label, which will be rendered on top'
  },
  name: {
    description: 'Name of the field in formik values'
  }
};

Single.args = {
  placeholder: 'Placeholder',
  label: 'Label'
};

const WithAddonTemplate: Story<TextFieldProps> = (args) => {
  return (
    <Formik // TODO: Default Wrapper for storybook with Formik
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
          <InputGroup
            label={args.label}
          >
            <TextField.Addon>Left Addon</TextField.Addon>
            <TextField
              {...omit(args, 'label')}
              name='text'
            />
            <TextField.Addon>Right Addon</TextField.Addon>
          </InputGroup>
        </Form>
      )}
    </Formik>
  );
};

export const WithAddon = WithAddonTemplate.bind({});

WithAddon.argTypes = Single.argTypes;
WithAddon.args = Single.args;

const WithInnerElementsTemplate: Story<TextFieldProps> = (args) => {
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
          <TextField
            {...args}
            name='text'
          >
            <TextField.InnerLeft
              width={20}
            >
              <div
                className='h-5 w-5'
              >
                <LockClosedIcon />
              </div>
            </TextField.InnerLeft>
            <TextField.InnerRight
              width={20}
            >
              <div
                className='h-5 w-5'
              >
                <EyeIcon />
              </div>
            </TextField.InnerRight>
          </TextField>
        </Form>
      )}
    </Formik>
  );
};

export const WithInnerElements = WithInnerElementsTemplate.bind({});

WithInnerElements.argTypes = Single.argTypes;
WithInnerElements.args = Single.args;

const schema = z.object({
  text: z.string().regex(/abc/, { message: 'Field content has to be "abc"' })
});

const ValidationTemplate: Story<TextFieldProps> = (args) => {
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
      validate={zodAdapter(schema)}
    >
      {() => (
        <Form>
          <TextField
            {...args}
            name='text'
          />
        </Form>
      )}
    </Formik>
  );
};

export const Validation = ValidationTemplate.bind({});

Validation.argTypes = Single.argTypes;
Validation.args = Single.args;

const ClearableTemplate: Story<TextFieldProps> = (args) => {
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
          <TextField
            {...args}
            isClearable
            name='text'
          />
        </Form>
      )}
    </Formik>
  );
};

export const Clearable = ClearableTemplate.bind({});

Clearable.argTypes = Single.argTypes;
Clearable.args = Single.args;
