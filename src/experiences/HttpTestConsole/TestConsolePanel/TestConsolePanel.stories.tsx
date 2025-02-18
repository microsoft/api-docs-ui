import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import HttpTestConsole from '../HttpTestConsole';
import TestConsolePanel from './TestConsolePanel';

const meta = {
  title: 'HttpTestConsole/HttpTestConsole.Panel',
  component: TestConsolePanel,
  parameters: {
    docs: {
      subtitle: 'An HttpTestConsole collapsible panel component.',
    },
  },
} satisfies Meta<typeof TestConsolePanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'urlParams',
    header: 'URL parameters',
    children: 'Panel content',
    isOpenByDefault: true,
  },
  render: (props) => (
    <HttpTestConsole>
      <HttpTestConsole.Panel {...props} />
    </HttpTestConsole>
  ),
};
