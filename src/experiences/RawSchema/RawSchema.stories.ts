import type { Meta, StoryObj } from '@storybook/react';
import RawSchema from './RawSchema';

const meta = {
  title: 'RawSchema',
  component: RawSchema,
  parameters: {
    docs: {
      subtitle: 'A component that displays raw schema definition.',
    },
  },
} satisfies Meta<typeof RawSchema>;

export default meta;

type Story = StoryObj<typeof meta>;

const DEFAULT_ARGS = {
  title: 'Schema (json)',
  language: 'json',
  schema: `
{
    "type": "object",
    "properties": {
        "id": {
            "type": "integer",
            "format": "int64",
            "example": 10
        },
        "username": {
            "type": "string",
            "example": "theUser"
        },
        "firstName": {
            "type": "string",
            "example": "John"
        },
        "lastName": {
            "type": "string",
            "example": "James"
        },
        "email": {
            "type": "string",
            "example": "john@email.com"
        },
        "password": {
            "type": "string",
            "example": "12345"
        },
        "phone": {
            "type": "string",
            "example": "12345"
        },
        "userStatus": {
            "type": "integer",
            "description": "User Status",
            "format": "int32",
            "example": 1
        }
    },
    "xml": {
        "name": "user"
    }
}
  `.trim(),
};

export const Default: Story = {
  args: DEFAULT_ARGS,
};
