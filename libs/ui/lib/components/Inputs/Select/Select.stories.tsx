import { Meta, Story } from '@storybook/react';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import Select, { SelectProps } from './Select';

export default {
  component: Select,
  title: 'Components/Inputs/Select'
} as Meta;

const people = [
  { id: '1', name: 'Durward Reynolds', unavailable: false },
  { id: '2', name: 'Kenton Towne', unavailable: false },
  { id: '3', name: 'Therese Wunsch', unavailable: false },
  { id: '4', name: 'Benedict Kessler', unavailable: true },
  { id: '5', name: 'Katelyn Rohan', unavailable: false }
];

const SingleTemplate: Story<SelectProps<(typeof people)[number]>> = (args) => {
  return (
    <Formik
        initialValues={{
          selectedItem: {}
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
            <Select<typeof people>
              {...args}
              name='selectedItem'
              displayValue={(data) => {
                return (
                  <div
                    className='flex justify-between w-full items-center align-middle'
                  >
                    <div
                      className={classNames({
                        'text-gray-300': !data
                      })}
                    >
                      {data?.name || 'Select a value...'}
                    </div>
                    <div>
                      {data?.id || null}
                    </div>
                  </div>
                );
              }}
            >
              <Select.Options<typeof people>
                data={people}
              >
                {(data) => {
                  return (
                    <div>
                      {data.name}
                    </div>
                  );
                }}
              </Select.Options>
            </Select>
          </Form>
        )}
      </Formik>
  );
};

export const Single = SingleTemplate.bind({});
Single.args = {
  label: 'Label'
};
