import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ApiOperation } from '@/types/apiOperation';
import ApiOperationsList from './ApiOperationsList';

const meta = {
  title: 'ApiOperationsList',
  component: ApiOperationsList,
  args: {
    selectedOperationName: 'createUser',
    labelField: 'displayName',
    allowLabelWrap: false,
    defaultAllGroupTagsExpanded: false,
    onOperationSelect: fn(),
  },
  parameters: {
    docs: {
      subtitle:
        'Operation list with an ability to select a specific operation (must be handled by parent). Supports flat and grouped lists.',
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
