import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BinaryBodyForm from './BinaryBodyForm';

const meta = {
  title: 'HttpTestConsole/HttpTestConsole.BodyForm/HttpTestConsole.BodyForm.Binary',
  component: BinaryBodyForm,
  parameters: {
    docs: {
      subtitle: 'An HttpTestConsole raw body editor form.',
    },
  },
} satisfies Meta<typeof BinaryBodyForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: null,
    onChange: () => {},
  },
  render: (props) => {
    const [value, setValue] = useState(props.value);

    return <BinaryBodyForm {...props} value={value} onChange={setValue} />;
  },
};
