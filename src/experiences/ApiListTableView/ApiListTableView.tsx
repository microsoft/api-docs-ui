import React, { useState } from 'react';
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Button,
  Body1Strong,
} from '@fluentui/react-components';
import ExpandIcon from '@/components/ExpandIcon';
import { Api } from '@/types/api';
import { TagGroup } from '@/types/common';
import { toggleSetValue } from '@/utils/toggleSetValue';
import { isTagGroupedList } from '@/utils/common';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import ScrollableTableContainer from '@/components/ScrollableTableContainer';
import styles from './ApiListTableView.module.scss';

export interface Props {
  /** A list of APIs or API groups to display. */
  apis: Api[] | Array<TagGroup<Api>>;
  /** If true - show the API type column. */
  showApiType?: boolean;
  /** A function that accepts API object and returns props for the link to the API details page. */
  apiLinkPropsProvider: (api: Api) => React.ComponentProps<typeof Link>;
}

const MD_MAX_LENGTH = 120;

export const ApiListTableView: React.FC<Props> = ({ apis, showApiType, apiLinkPropsProvider }) => {
  const [expandedTags, setExpandedTags] = useState(new Set<string>());

  const isGrouped = isTagGroupedList<Api>(apis);
  const fullWidthColSpan = 2 + Number(!!showApiType);

  function renderApiRows(apis?: Api[]) {
    if (!apis.length) {
      return (
        <TableRow>
          <TableCell className={styles.noRecordsCell} colSpan={fullWidthColSpan}>
            No APIs to display
          </TableCell>
        </TableRow>
      );
    }

    return apis.map((api) => (
      <TableRow key={api.name}>
        <TableCell>
          <Link title={api.displayName} {...apiLinkPropsProvider(api)}>
            {api.displayName}
          </Link>
        </TableCell>
        <TableCell>
          <MarkdownRenderer markdown={api.description} maxLength={MD_MAX_LENGTH} />
        </TableCell>
        {showApiType && <TableCell>{api.type}</TableCell>}
      </TableRow>
    ));
  }

  function renderApisByTagRows(apisByTag: Array<TagGroup<Api>>) {
    return apisByTag.map(({ tag, items }) => (
      <React.Fragment key={tag}>
        <TableRow
          className="fui-table-collapsibleRow"
          onClick={() => setExpandedTags((old) => toggleSetValue(old, tag))}
        >
          <TableCell colSpan={fullWidthColSpan}>
            <Button
              className="no-border align-center"
              icon={<ExpandIcon isExpanded={expandedTags.has(tag)} />}
              appearance="transparent"
            >
              <Body1Strong>{tag}</Body1Strong>
            </Button>
          </TableCell>
        </TableRow>

        {expandedTags.has(tag) && renderApiRows(items)}
      </React.Fragment>
    ));
  }

  function renderBody() {
    if (isGrouped) {
      return renderApisByTagRows(apis as Array<TagGroup<Api>>);
    }
    return renderApiRows(apis as Api[]);
  }

  return (
    <ScrollableTableContainer className={styles.apiListTableView}>
      <Table className="fui-table" size="small">
        <TableHeader>
          <TableRow className="fui-table-headerRow">
            <TableHeaderCell>
              <Body1Strong>Name</Body1Strong>
            </TableHeaderCell>
            <TableHeaderCell>
              <Body1Strong>Description</Body1Strong>
            </TableHeaderCell>

            {showApiType && (
              <TableHeaderCell className={styles.typeCol}>
                <Body1Strong>Type</Body1Strong>
              </TableHeaderCell>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>{renderBody()}</TableBody>
      </Table>
    </ScrollableTableContainer>
  );
};

export default React.memo(ApiListTableView);
