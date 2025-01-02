import type { Meta, StoryObj } from '@storybook/react';
import ApiOperationInfo from './ApiOperationInfo';

const meta = {
  title: 'ApiOperationInfo',
  component: ApiOperationInfo,
  parameters: {
    docs: {
      subtitle: 'A component that displays detailed information about an API operation.',
    },
  },
} satisfies Meta<typeof ApiOperationInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

const DEFAULT_ARGS = {
  operation: {
    name: 'createUser',
    description: 'Creates a new user in the system.',
    method: 'POST',
    urlTemplate: '/users',
    displayName: 'Create new user',
  },
  requestUrl: 'https://api-example.azure-api.net/v1/users',
};

export const Default: Story = {
  args: DEFAULT_ARGS,
};

export const WithTags: Story = {
  args: {
    ...DEFAULT_ARGS,
    tags: ['API', 'V1', 'Users'],
  },
};
