import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import HttpTestConsole from '../HttpTestConsole';
import { HttpBodyFormats } from '@/enums/HttpBodyFormats';
import BodyForm from './BodyForm';

const meta = {
  title: 'HttpTestConsole/HttpTestConsole.BodyForm',
  component: BodyForm,
  parameters: {
    docs: {
      subtitle: 'An HttpTestConsole body editor panel.',
    },
  },
} satisfies Meta<typeof BodyForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'body',
    value: {
      format: HttpBodyFormats.Raw,
      value: '',
    },
    children: null,
    onChange: () => {},
  },
  render: (props) => {
    const [value, setValue] = useState(props.value);

    return (
      <HttpTestConsole>
        <HttpTestConsole.BodyForm {...props} value={value} onChange={setValue}>
          <HttpTestConsole.BodyForm.Raw />
          <HttpTestConsole.BodyForm.Binary />
          <HttpTestConsole.BodyForm.FormData
            fields={[
              {
                name: 'textField',
                type: 'string',
                fieldType: 'text',
                description: 'Sample text field',
                required: true,
              },
              {
                name: 'selectField',
                type: 'string',
                fieldType: 'select',
                description: 'Sample select field',
                enum: ['one', 'two', 'three'],
              },
              {
                name: 'numberField',
                type: 'number',
                description: 'Sample number field',
                fieldType: 'number',
              },
              {
                name: 'fileField',
                type: 'binary',
                description: 'Sample binary field',
                fieldType: 'file',
              },
            ]}
          />
        </HttpTestConsole.BodyForm>
      </HttpTestConsole>
    );
  },
};
