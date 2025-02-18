import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import HttpTestConsole from '../HttpTestConsole';
import ParamsListForm from './ParamsListForm';

const meta = {
  title: 'HttpTestConsole/HttpTestConsole.ParamsListForm',
  component: ParamsListForm,
  parameters: {
    docs: {
      subtitle:
        'An params list form. Each param is a key-value pair. A list of params definitions can be passed to change params behavior (like required params, or secrets for example).',
    },
  },
} satisfies Meta<typeof ParamsListForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    name: 'query',
    title: 'Query',
    value: [],
    isStrictSchema: false,
    onChange: () => {},
  },
  render: (props) => {
    const [value, setValue] = useState([]);

    return (
      <HttpTestConsole>
        <HttpTestConsole.ParamsListForm {...props} value={value} onChange={(_, v) => setValue(v)} />
      </HttpTestConsole>
    );
  },
};

export const WithRequiredField: Story = {
  args: {
    name: 'query',
    title: 'Query',
    value: [
      { name: 'id', value: '' },
      { name: 'otherParam', value: '' },
    ],
    params: [{ name: 'id', type: 'string', required: true }],
    onChange: () => {},
  },
  render: (props) => {
    const [value, setValue] = useState(props.value);

    return (
      <HttpTestConsole>
        <HttpTestConsole.ParamsListForm {...props} value={value} onChange={(_, v) => setValue(v)} />
      </HttpTestConsole>
    );
  },
};

export const WithErrors: Story = {
  args: {
    name: 'query',
    title: 'Query',
    value: [
      { name: 'id', value: '' },
      { name: 'wrongParam', value: '' },
    ],
    errors: [null, 'This param is not allowed'],
    isStrictSchema: true,
    onChange: () => {},
  },
  render: (props) => {
    const [value, setValue] = useState(props.value);

    return (
      <HttpTestConsole>
        <HttpTestConsole.ParamsListForm {...props} value={value} onChange={(_, v) => setValue(v)} />
      </HttpTestConsole>
    );
  },
};
