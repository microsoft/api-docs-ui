import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@fluentui/react-components';
import ScrollableTableContainer from '@/components/ScrollableTableContainer';
import CollapsibleRow from './CollapsibleRow';

const subComponents = {
  Row: TableRow,
  Cell: TableCell,
  CollapsibleRow,
};

export interface Props {
  /** Table header labels. */
  columnLabels: string[];
  /** Table body children. */
  children?: React.ReactNode;
  /** A message that would be displayed if there are no children. */
  noDataMessage?: string;
}

type ResultType = React.NamedExoticComponent<Props> & typeof subComponents;

export const InfoTable: React.FC<Props> = ({ columnLabels, children, noDataMessage = 'No items' }) => {
  const extendedChildren = useMemo(
    () =>
      React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        if (child.type === CollapsibleRow) {
          return React.cloneElement<React.ComponentProps<typeof CollapsibleRow>>(
            child as React.FunctionComponentElement<React.ComponentProps<typeof CollapsibleRow>>,
            {
              fullWidthColSpan: child.props.fullWidthColSpan || columnLabels.length,
              noDataMessage: child.props.noDataMessage || noDataMessage,
            }
          );
        }

        return child;
      }),
    [children, columnLabels.length, noDataMessage]
  );
  return (
    <ScrollableTableContainer>
      <Table className="fui-table">
        <TableHeader>
          <TableRow className="fui-table-headerRow">
            {columnLabels.map((column) => (
              <TableHeaderCell key={column}>
                <strong>{column}</strong>
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {!React.Children.count(extendedChildren) && (
            <TableRow className="fui-table-body-row">
              <TableCell colSpan={columnLabels.length} style={{ textAlign: 'center' }}>
                {noDataMessage}
              </TableCell>
            </TableRow>
          )}

          {extendedChildren}
        </TableBody>
      </Table>
    </ScrollableTableContainer>
  );
};

const InfoTableMemo = React.memo(InfoTable);
InfoTableMemo.displayName = 'InfoTable';

export default Object.assign(InfoTableMemo, subComponents) as ResultType;
