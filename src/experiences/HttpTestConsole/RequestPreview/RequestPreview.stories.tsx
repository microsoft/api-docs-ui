import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import HttpTestConsole from '../HttpTestConsole';
import { HttpBodyFormats } from '@/types/testConsole';
import RequestPreview from './RequestPreview';

const meta = {
  title: 'HttpTestConsole/HttpTestConsole.RequestPreview',
  component: RequestPreview,
  parameters: {
    docs: {
      subtitle: 'An HttpTestConsole request preview panel.',
    },
  },
} satisfies Meta<typeof RequestPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'request',
    reqData: {
      urlTemplate: 'https://local.host/api/v1/resource/{resourceId}',
      method: 'get',
      urlParams: [
        {
          name: 'resourceId',
          value: '12345678',
        },
      ],
      query: [],
      headers: [
        {
          name: 'api_key',
          value: 'sample_api_key',
        },
      ],
      bodyFormat: HttpBodyFormats.RAW,
      body: undefined,
    },
    schemas: {
      query: [],
      headers: [
        {
          name: 'api_key',
          type: 'string',
          in: 'header',
          required: false,
          isSecret: true,
        },
      ],
      urlParams: [
        {
          name: 'resourceId',
          in: 'path',
          description: 'ID of resource to return',
          required: true,
          type: 'string',
        },
      ],
    },
  },
  render: (props) => {
    return (
      <HttpTestConsole>
        <HttpTestConsole.RequestPreview {...props} />
      </HttpTestConsole>
    );
  },
};
