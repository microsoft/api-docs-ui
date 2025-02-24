import type { Meta, StoryObj } from '@storybook/react';
import ApiCard from './ApiCard';

const meta = {
  title: 'ApiCard',
  component: ApiCard,
  args: {
    api: {
      name: 'http-bin',
      displayName: 'HTTP Bin',
      description: 'A simple HTTP request and response service.',
      type: 'rest',
    },
    showType: true,
  },
  parameters: {
    docs: {
      subtitle: 'A card representation of API.',
    },
  },
} satisfies Meta<typeof ApiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
