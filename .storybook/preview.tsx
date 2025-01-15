import React from 'react';
import type { Preview } from '@storybook/react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Title, Subtitle, Description, Controls, Stories } from '@storybook/blocks';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      toc: true,
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Stories title="Examples" />
          <Controls sort="requiredFirst" />
        </>
      ),
    },
  },
};

export const decorators = [
  (Story) => (
    <FluentProvider theme={webLightTheme}>
      <Story />
    </FluentProvider>
  ),
];

export default preview;
