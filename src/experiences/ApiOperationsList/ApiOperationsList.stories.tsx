import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ApiOperation } from '@/types/apiOperation';
import ApiOperationsList from './ApiOperationsList';

const meta = {
  title: 'ApiOperationsList',
  component: ApiOperationsList,
  argTypes: {
    operations: {
      description: 'A list of API operations or API operations groups to display.',
    },
    selectedOperationName: {
      description: 'A name of currently selected operation.',
      control: 'text',
    },
    labelField: {
      description: 'An operation data field that should be used as a label.',
      control: 'select',
      options: ['urlTemplate', 'displayName'],
      table: {
        defaultValue: {
          summary: 'displayName',
        },
      },
    },
    allowLabelWrap: {
      description: 'If true - allow label to wrap to the next line. Otherwise - truncate the label.',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    defaultAllGroupTagsExpanded: {
      description: 'If true - all group tags are expanded by default. Can be used only when operations are grouped.',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onOperationSelect: {
      description: 'A callback that is called when an operation is selected. An entire operation object is passed as an argument.',
    },
  },
  args: {
    allowLabelWrap: false,
    defaultAllGroupTagsExpanded: false,
    onOperationSelect: fn(),
  },
  parameters: {
    docs: {
      subtitle: 'A table representation of the API list. It can render either a flat list of APIs or APIs grouped by tag.',
    },
  },
} satisfies Meta<typeof ApiOperationsList>;

export default meta;

const operations = [
  {
    name: 'createUser',
    method: 'POST',
    urlTemplate: '/users',
    displayName: 'Create new user',
    tag: 'users',
  },
  {
    name: 'updateUser',
    method: 'PUT',
    urlTemplate: '/users/{userId}',
    displayName: 'Update existing user',
    tag: 'users',
  },
  {
    name: 'readUser',
    method: 'GET',
    urlTemplate: '/users/{userId}',
    displayName: 'Read user details',
    tag: 'users',
  },
  {
    name: 'deleteUser',
    method: 'DELETE',
    urlTemplate: '/users/{userId}',
    displayName: 'Delete user',
    tag: 'users',
  },
  {
    name: 'createPost',
    method: 'POST',
    urlTemplate: '/posts',
    displayName: 'Create new post',
    tag: 'posts',
  },
  {
    name: 'updatePost',
    method: 'PUT',
    urlTemplate: '/posts/{postId}',
    displayName: 'Update existing post',
    tag: 'posts',
  },
  {
    name: 'readPost',
    method: 'GET',
    urlTemplate: '/posts/{postId}',
    displayName: 'Read post details',
    tag: 'posts',
  },
  {
    name: 'deletePost',
    method: 'DELETE',
    urlTemplate: '/posts/{postId}',
    displayName: 'Delete post',
    tag: 'posts',
  },
];

const operationListByTag = operations.reduce<Record<string, ApiOperation[]>>((acc, op) => {
  if (!acc[op.tag]) {
    acc[op.tag] = [];
  }
  acc[op.tag].push(op);
  return acc;
}, {});

type Story = StoryObj<typeof meta>;

export const FlatList: Story = { args: { operations } };

export const GroupedByTag: Story = {
  args: {
    operations: Object.keys(operationListByTag).map((tag) => ({
      tag,
      items: operationListByTag[tag],
    })),
  },
};

export const Empty: Story = { args: { operations: [] } };
