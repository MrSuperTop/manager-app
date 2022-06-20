import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import { ItemsData } from './store';

export interface OptionsProps<T extends ItemsData> {
  data: T,
  children: (data: T[0]) => JSX.Element[] | JSX.Element
};

const Options = <T extends ItemsData>({
  data,
  children
}: OptionsProps<T>) => {
  return (
    <Listbox.Options
      static
      className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
    >
      {data.map((item) => (
        <Listbox.Option
          key={item.id}
          value={item}
          className='relative transition duration-75 flex justify-start items-center px-3 py-2 hover:bg-primary hover:text-white cursor-pointer group'
        >
          {({ selected }) => (
            <>
              <div className="flex items-center">
                {children(item)}
              </div>

              {selected ? (
                <span
                  className='absolute inset-y-0 right-0 flex items-center pr-4 transition duration-75 text-primary group-hover:text-white'
                >
                  <CheckIcon
                    className="h-5 w-5"
                  />
                </span>
              ) : null}
            </>
          )}
        </Listbox.Option>
      ))}
    </Listbox.Options>
  );
};

export default Options;
