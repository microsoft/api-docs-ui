import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx', '../src/**/*.mdx'],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/react-vite',
};

export default config;
