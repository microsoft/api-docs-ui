import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import HttpTestConsole from '../HttpTestConsole';
import RawBody from './RawBody';

const meta = {
  title: 'HttpTestConsole/HttpTestConsole.RawBody',
  component: RawBody,
  parameters: {
    docs: {
      subtitle: 'An HttpTestConsole raw body editor panel.',
    },
  },
} satisfies Meta<typeof RawBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'body',
    value: '',
    onChange: () => {},
  },
  render: (props) => {
    const [value, setValue] = useState(props.value);

    return (
      <HttpTestConsole>
        <HttpTestConsole.RawBody name={props.name} value={value} onChange={setValue} />
      </HttpTestConsole>
    );
  },
};
