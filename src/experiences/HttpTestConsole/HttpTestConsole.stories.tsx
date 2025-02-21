import React, { useCallback, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HttpReqData, HttpReqParam } from '@/types/testConsole';
import { HttpBodyFormats } from '@/enums/HttpBodyFormats';
import HttpTestConsole from './HttpTestConsole';

const meta = {
  title: 'HttpTestConsole',
  component: HttpTestConsole,
  parameters: {
    docs: {
      subtitle: 'Http test console root component',
    },
  },
} satisfies Meta<typeof HttpTestConsole>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: [] },
  render: () => {
    const [data, setData] = useState({
      urlParams: [{ name: 'resourceId', value: '' }],
      query: [],
      headers: [
        { name: 'Authorization', value: 'Bearer 12345678' },
        { name: 'Content-Type', value: 'application/json' },
      ],
      body: '',
    });

    const handleChange = useCallback((name: string, value: HttpReqParam[]) => {
      setData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleBodyChange = useCallback((value: string) => {
      setData((prev) => ({ ...prev, body: value }));
    }, []);

    const reqData = useMemo<HttpReqData>(
      () => ({
        urlTemplate: 'https://local.host/api/v1/resource/{resourceId}',
        method: 'get',
        urlParams: data.urlParams,
        query: data.query,
        headers: data.headers,
        bodyFormat: HttpBodyFormats.RAW,
        body: data.body,
      }),
      [data]
    );

    return (
      <HttpTestConsole>
        <HttpTestConsole.ParamsListForm
          name="urlParams"
          title="URL params"
          value={data.urlParams}
          params={[{ name: 'resourceId', type: 'string', required: true }]}
          isStrictSchema
          onChange={handleChange}
        />
        <HttpTestConsole.ParamsListForm name="query" title="Query" value={data.query} onChange={handleChange} />
        <HttpTestConsole.ParamsListForm
          name="headers"
          title="Headers"
          params={[{ name: 'Authorization', type: 'string', isSecret: true }]}
          value={data.headers}
          onChange={handleChange}
        />
        <HttpTestConsole.RawBody name="body" value={data.body} onChange={handleBodyChange} />
        <HttpTestConsole.RequestPreview
          name="request"
          reqData={reqData}
          schemas={{
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
          }}
        />
      </HttpTestConsole>
    );
  },
};
