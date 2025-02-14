import type { Meta, StoryObj } from '@storybook/react';
import CopyToClipboard from './CopyToClipboard';

const meta = {
  title: 'CopyToClipboard',
  component: CopyToClipboard,
  parameters: {
    docs: {
      subtitle: 'A component that allows to copy any text content to clipboard.',
    },
  },
} satisfies Meta<typeof CopyToClipboard>;

export default meta;

type Story = StoryObj<typeof meta>;

const DEFAULT_ARGS = {
  content: 'Hello, world!',
};

export const Default: Story = {
  args: DEFAULT_ARGS,
};

export const Subtle: Story = {
  args: { ...DEFAULT_ARGS, appearance: 'subtle' },
};
