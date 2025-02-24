import type { Meta, StoryObj } from '@storybook/react';
import ParametersTable from './ParametersTable';

const meta = {
  title: 'ParametersTable',
  component: ParametersTable,
  parameters: {
    docs: {
      subtitle: 'Table representation of request parameters.',
    },
  },
} satisfies Meta<typeof ParametersTable>;

export default meta;

type Story = StoryObj<typeof meta>;

const parameters = [
  {
    name: 'title',
    in: 'body',
    required: true,
    type: 'string',
    description: 'The title of the post.',
    examples: [
      { title: 'Example 1', value: 'Lorem Ipsum', description: 'First example' },
      { title: 'Example 2', value: 'Dolor sit amet', description: 'Second example' },
    ],
  },
  {
    name: 'content',
    in: 'body',
    required: true,
    type: 'string',
    description: 'Markdown post content.',
    examples: [{ value: 'Sample content' }],
  },
  {
    name: 'categoryId',
    in: 'body',
    type: 'string',
    description: 'The ID of the category the post belongs to.',
  },
  {
    name: 'tagIds',
    in: 'body',
    type: 'Array<string>',
    description: 'List of post tag IDs.',
  },
  {
    name: 'authorId',
    in: 'body',
    required: true,
    type: 'string',
    description: 'The ID of the author of the post.',
  },
];

export const Default: Story = { args: { parameters } };

export const WithHiddenColumns: Story = {
  args: {
    parameters,
    hiddenColumns: ['in', 'type'],
  },
};

export const Empty: Story = { args: { parameters: [] } };
