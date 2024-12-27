import React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

export const decorators = [
  (Story) => (
    <FluentProvider theme={webLightTheme}>
      <Story />
    </FluentProvider>
  ),
];
