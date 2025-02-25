import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RawBodyForm from './RawBodyForm';

const meta = {
  title: 'HttpTestConsole/HttpTestConsole.BodyForm/HttpTestConsole.BodyForm.Raw',
  component: RawBodyForm,
  parameters: {
    docs: {
      subtitle: 'An HttpTestConsole raw body editor form.',
    },
  },
} satisfies Meta<typeof RawBodyForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
  render: (props) => {
    const [value, setValue] = useState(props.value);

    return <RawBodyForm {...props} value={value} onChange={setValue} />;
  },
};

export const WithDataSamples: Story = {
  args: {
    value: '',
    dataSamples: [
      {
        name: 'Sample (json)',
        value: '{\n  "key": "value"\n}',
      },
      {
        name: 'Sample (xml)',
        value: '<key>value</key>',
      },
    ],
    onChange: () => {},
  },
  render: (props) => {
    const [value, setValue] = useState(props.value);

    return <RawBodyForm {...props} value={value} onChange={setValue} />;
  },
};
