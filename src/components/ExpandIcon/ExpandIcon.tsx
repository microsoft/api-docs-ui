import React from 'react';
import { ChevronDown16Regular, ChevronUp16Regular } from '@fluentui/react-icons';

interface Props {
  isExpanded: boolean;
}

export const ExpandIcon: React.FC<Props> = ({ isExpanded }) => {
  if (isExpanded) {
    return <ChevronUp16Regular />;
  }
  return <ChevronDown16Regular />;
};

export default React.memo(ExpandIcon);
