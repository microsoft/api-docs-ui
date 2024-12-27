import type { Meta, StoryObj } from '@storybook/react';

import { Api } from '@/types/api';
import { ApiListTableView } from './ApiListTableView';

const meta = {
  title: 'Api List/ApiListTableView',
  component: ApiListTableView,
  // parameters: { layout: 'centered' },
  argTypes: { showApiType: { control: 'boolean' } },
  args: {
    showApiType: true,
    apiLinkPropsProvider: () => ({
      onClick(e) {
        e.preventDefault();
      },
    }),
  },
} satisfies Meta<typeof ApiListTableView>;

export default meta;

const apis = [
  {
    name: 'http-bin',
    displayName: 'HTTP Bin',
    description: 'A simple HTTP request and response service.',
    type: 'rest',
    tag: 'utilities',
  },
  {
    name: 'email-validator',
    displayName: 'Email Validator',
    description: 'Validates email addresses for syntax and deliverability.',
    type: 'rest',
    tag: 'utilities',
  },
  {
    name: 'geo-location',
    displayName: 'GeoLocation API',
    description: 'Provides geolocation data based on IP addresses.',
    type: 'rest',
    tag: 'utilities',
  },
  {
    name: 'currency-converter',
    displayName: 'Currency Converter API',
    description: 'Provides exchange rates and currency conversion capabilities.',
    type: 'rest',
    tag: 'finance',
  },
  {
    name: 'payment-gateway',
    displayName: 'Payment Gateway API',
    description: 'Facilitates secure online payment processing.',
    type: 'rest',
    tag: 'finance',
  },
  {
    name: 'stock-market',
    displayName: 'Stock Market Data API',
    description: 'Fetches stock market data, including prices and trends.',
    type: 'rest',
    tag: 'finance',
  },
];

const apiListByTag = apis.reduce<Record<string, Api[]>>((acc, api) => {
  if (!acc[api.tag]) {
    acc[api.tag] = [];
  }
  acc[api.tag].push(api);
  return acc;
}, {});

type Story = StoryObj<typeof meta>;

export const FlatList: Story = { args: { apis } };

export const GroupedByTag: Story = {
  args: {
    apisByTag: Object.keys(apiListByTag).map((tag) => ({
      tag,
      items: apiListByTag[tag],
    })),
  },
};
