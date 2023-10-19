'use client';

// I add react-hook-form to the equation
import {
  useForm,
  useController,
  Controller,
  FormSubmitHandler,
} from 'react-hook-form';
// I copy paste a headless UI example from tailwind
// SEE: https://tailwindui.com/components/application-ui/forms/select-menus#component-8298198b136afab3bb19391ae716077f
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
  { id: 7, name: 'Caroline Schultz' },
  { id: 8, name: 'Mason Heaney' },
  { id: 9, name: 'Claudie Smitham' },
  { id: 10, name: 'Emil Schaefer' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface Inputs {
  person?: (typeof people)[0];
}

export default function Home() {
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: { person: people[0] },
  });

  const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data, undefined, 4));
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={onSubmit}>
        {/* 
          Listbox is a controlled component, even when it is 'uncontrolled'
          It does not proffer an html select element, isntead relying on many
          divs to create a custom and beautiful "select" element, hence the name 'Listbox'
          It does not expose a ref either, all in all we must use a controller from, react-hook-form
         */}
        <Controller
          control={control}
          name="person"
          rules={
            {
              /* Validating an object is possible */
            }
          }
          render={({ field: { onChange, value } }) => (
            <Listbox value={value} onChange={onChange}>
              {({ open, value }) => (
                <>
                  <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                    Assigned to
                  </Listbox.Label>
                  <div className="relative mt-2">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      <span className="block truncate">{value.name}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {people.map((person) => (
                          <Listbox.Option
                            key={person.id}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? 'bg-indigo-600 text-white'
                                  : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                              )
                            }
                            value={person}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={classNames(
                                    selected ? 'font-semibold' : 'font-normal',
                                    'block truncate'
                                  )}
                                >
                                  {person.name}
                                </span>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          )}
        />

        <button
          className="mt-8 p-2 rounded-md border-gray-500 border"
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
