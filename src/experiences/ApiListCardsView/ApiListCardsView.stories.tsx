import type { Meta, StoryObj } from '@storybook/react';
import { Api } from '@/types/api';
import ApiListCardsView from './ApiListCardsView';

const meta = {
  title: 'ApiListCardsView',
  component: ApiListCardsView,
  argTypes: {
    apis: {
      description: 'A list of APIs or API groups to display.',
    },
    showApiType: {
      description: 'If true - show the API type column.',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    apiLinkPropsProvider: {
      description: 'A function that accepts API object and returns props for the link to the API details page.',
    },
  },
  args: {
    showApiType: true,
    apiLinkPropsProvider: () => ({
      onClick(e) {
        e.preventDefault();
      },
    }),
  },
  parameters: {
    docs: {
      subtitle: 'A table representation of the API list. It can render either a flat list of APIs or APIs grouped by tag.',
    },
  },
} satisfies Meta<typeof ApiListCardsView>;

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
    apis: Object.keys(apiListByTag).map((tag) => ({
      tag,
      items: apiListByTag[tag],
    })),
  },
};

export const Empty: Story = { args: { apis: [] } };
