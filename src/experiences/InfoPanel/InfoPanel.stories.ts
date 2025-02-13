import type { Meta, StoryObj } from '@storybook/react';
import InfoPanel from './InfoPanel';

const meta = {
  title: 'InfoPanel',
  component: InfoPanel,
  parameters: {
    docs: {
      subtitle: 'A component that displays an info panel with title.',
    },
  },
} satisfies Meta<typeof InfoPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

const DEFAULT_ARGS = {
  title: 'Request URL',
  children: 'https://api-example.azure-api.net/v1/users',
};

export const Default: Story = {
  args: DEFAULT_ARGS,
};
