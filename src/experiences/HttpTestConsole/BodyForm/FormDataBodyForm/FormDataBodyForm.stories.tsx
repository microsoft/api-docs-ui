import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FormDataBodyForm from './FormDataBodyForm';

const meta = {
  title: 'HttpTestConsole/HttpTestConsole.BodyForm/HttpTestConsole.BodyForm.FormData',
  component: FormDataBodyForm,
  parameters: {
    docs: {
      subtitle: 'An HttpTestConsole raw body editor form.',
    },
  },
} satisfies Meta<typeof FormDataBodyForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: {},
    fields: [
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
    ],
    onChange: () => {},
  },
  render: (props) => {
    const [value, setValue] = useState(props.value);

    return <FormDataBodyForm {...props} value={value} onChange={setValue} />;
  },
};
