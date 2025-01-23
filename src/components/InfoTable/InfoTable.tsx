import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@fluentui/react-components';

interface Props<T = object> {
  dataItems: T[];
  columns: Array<{
    key: keyof T;
    title: string;
    renderer?: (value: unknown) => React.ReactNode;
  }>;
  noDataMessage?: string;
}

export const InfoTable: React.FC<Props> = ({ dataItems, columns, noDataMessage = 'No items' }) => {
  return (
    <Table className="fui-table">
      <TableHeader>
        <TableRow className="fui-table-headerRow">
          {columns.map((column) => (
            <TableHeaderCell key={column.key}>
              <strong>{column.title}</strong>
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {!dataItems.length && (
          <TableRow className="fui-table-body-row">
            <TableCell colSpan={columns.length} style={{ textAlign: 'center' }}>
              {noDataMessage}
            </TableCell>
          </TableRow>
        )}

        {dataItems.map((rowItem, index) => (
          <TableRow key={index} className="fui-table-body-row">
            {columns.map((column) => (
              <TableCell key={column.key}>
                {column.renderer ? column.renderer(rowItem[column.key]) : rowItem[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default React.memo(InfoTable);
