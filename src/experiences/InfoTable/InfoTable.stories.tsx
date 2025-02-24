import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '@fluentui/react-components';
import InfoTable from './InfoTable';

const meta = {
  title: 'InfoTable',
  component: InfoTable,
  args: {
    columnLabels: [],
    children: [],
  },
  parameters: {
    docs: {
      subtitle: 'A standardized info table that can be used to display various kinds of information.',
    },
  },
} satisfies Meta<typeof InfoTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <InfoTable columnLabels={['Name', 'Description', 'Type']}>
      <InfoTable.Row>
        <InfoTable.Cell>
          <Link href="#">HTTP Bin</Link>
        </InfoTable.Cell>
        <InfoTable.Cell>A simple HTTP request and response service.</InfoTable.Cell>
        <InfoTable.Cell>rest</InfoTable.Cell>
      </InfoTable.Row>
      <InfoTable.Row>
        <InfoTable.Cell>
          <Link href="#">Email Validator</Link>
        </InfoTable.Cell>
        <InfoTable.Cell>Validates email addresses for syntax and deliverability.</InfoTable.Cell>
        <InfoTable.Cell>rest</InfoTable.Cell>
      </InfoTable.Row>
      <InfoTable.Row>
        <InfoTable.Cell>
          <Link href="#">GeoLocation API</Link>
        </InfoTable.Cell>
        <InfoTable.Cell>Provides geolocation data based on IP addresses.</InfoTable.Cell>
        <InfoTable.Cell>rest</InfoTable.Cell>
      </InfoTable.Row>

      <InfoTable.CollapsibleRow label="Collapsible row">
        <InfoTable.Row>
          <InfoTable.Cell>
            <Link href="#">Currency Converter API</Link>
          </InfoTable.Cell>
          <InfoTable.Cell>Provides exchange rates and currency conversion capabilities.</InfoTable.Cell>
          <InfoTable.Cell>rest</InfoTable.Cell>
        </InfoTable.Row>
      </InfoTable.CollapsibleRow>

      <InfoTable.CollapsibleRow label="Collapsible row without children" />
    </InfoTable>
  ),
};

export const NoItems: Story = {
  args: {},
  render: () => <InfoTable columnLabels={['Name', 'Description', 'Type']} />,
};
