import React, { useCallback, useState } from 'react';
import { Body1Strong, Button, TableCell, TableRow } from '@fluentui/react-components';
import ExpandIcon from '@/components/ExpandIcon';

export interface Props {
  label: string;
  children?: React.ReactNode;
  noDataMessage?: string;
  fullWidthColSpan?: number;
}

export const CollapsibleRow: React.FC<Props> = ({ label, children, noDataMessage, fullWidthColSpan }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const onExpandToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <>
      <TableRow className="fui-table-collapsibleRow" onClick={onExpandToggle}>
        <TableCell colSpan={fullWidthColSpan}>
          <Button
            className="no-border align-center"
            icon={<ExpandIcon isExpanded={isExpanded} />}
            appearance="transparent"
          >
            <Body1Strong>{label}</Body1Strong>
          </Button>
        </TableCell>
      </TableRow>

      {isExpanded && !React.Children.count(children) && (
        <TableRow className="fui-table-body-row">
          <TableCell colSpan={fullWidthColSpan} style={{ textAlign: 'center' }}>
            {noDataMessage}
          </TableCell>
        </TableRow>
      )}
      {isExpanded && children}
    </>
  );
};

export default React.memo(CollapsibleRow);
