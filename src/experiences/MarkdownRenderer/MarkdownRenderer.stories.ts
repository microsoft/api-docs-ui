import type { Meta, StoryObj } from '@storybook/react';
import MarkdownRenderer from './MarkdownRenderer';

const meta = {
  title: 'MarkdownRenderer',
  component: MarkdownRenderer,
  args: {
    markdown:
      '[Lorem](#) ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    maxLength: 50,
    shouldTruncate: true,
  },
  parameters: {
    docs: {
      subtitle: 'A card representation of API.',
    },
  },
} satisfies Meta<typeof MarkdownRenderer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
