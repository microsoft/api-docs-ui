import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ApiOperationMethod from './ApiOperationMethod';

const meta = {
  title: 'ApiOperationMethod',
  component: ApiOperationMethod,
  parameters: {
    docs: {
      subtitle: 'A component that displays api operation method with color coding.',
    },
  },
} satisfies Meta<typeof ApiOperationMethod>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { method: 'GET' },
  render: () => (
    <>
      <ApiOperationMethod method="GET" />
      <ApiOperationMethod method="POST" />
      <ApiOperationMethod method="PUT" />
      <ApiOperationMethod method="DELETE" />
    </>
  ),
};
