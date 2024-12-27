import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Button,
} from '@fluentui/react-components';
import ExpandIcon from '@/components/ExpandIcon';
import { Api, ApiGroup } from '@/types/api';
import { toggleSetValue } from '@/utils/toggleSetValue';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface BaseProps {
  apis?: unknown;
  apisByTag?: unknown;
  showApiType?: boolean;
  apiLinkPropsProvider: (api: Api) => React.HTMLProps<HTMLAnchorElement>;
}

export interface ApiListProps extends BaseProps {
  apis: Api[];
  apisByTag?: never;
}

export interface ApisByTagProps extends BaseProps {
  apis?: never;
  apisByTag: ApiGroup[];
}

const MD_MAX_LENGTH = 120;

export const ApiListTableView: React.FC<ApiListProps | ApisByTagProps> = ({
  apis,
  apisByTag,
  showApiType,
  apiLinkPropsProvider,
}) => {
  const [expandedTags, setExpandedTags] = useState(new Set<string>());

  function renderApiRows(apis?: Api[]) {
    if (!apis.length) {
      return (
        <TableRow>
          <TableCell
            colSpan={showApiType ? 3 : 2}
            style={{ textAlign: 'center' }}
          >
            No APIs to display
          </TableCell>
        </TableRow>
      );
    }

    return apis.map((api) => (
      <TableRow key={api.name}>
        <TableCell>
          <a
            title={api.displayName}
            {...apiLinkPropsProvider(api)}
          >
            {api.displayName}
            {/* {!!api.apiVersion && " - " + api.apiVersion} */}
          </a>
        </TableCell>
        <TableCell style={{ padding: '.5rem 0' }}>
          <MarkdownRenderer
            markdown={api.description}
            maxLength={MD_MAX_LENGTH}
          />
        </TableCell>
        {showApiType && <TableCell>{api.type}</TableCell>}
      </TableRow>
    ));
  }

  function renderApisByTagRows(apisByTag: ApiGroup[]) {
    return apisByTag.map(({ tag, items }) => (
      <React.Fragment key={tag}>
        <TableRow onClick={() =>
          setExpandedTags((old) => toggleSetValue(old, tag))
        }
        >
          <TableCell>
            <Button
              icon={<ExpandIcon isExpanded={expandedTags.has(tag)} />}
              appearance="transparent"
            >
              <strong style={{ marginRight: '.375rem' }}>
                {tag}
              </strong>
            </Button>
          </TableCell>
          {/* in lines with tag, no content to display but empty cells needed to match width */}
          <TableCell></TableCell>
          {showApiType && <TableCell></TableCell>}
        </TableRow>

        {expandedTags.has(tag) && renderApiRows(items)}
      </React.Fragment>
    ))
  }

  function renderBody() {
    if (apis) {
      return renderApiRows(apis);
    }
    return renderApisByTagRows(apisByTag);
  }

  return (
    <Table
      className="fui-table"
      size="small"
      aria-label="APIs List table"
    >
      <TableHeader>
        <TableRow className="fui-table-headerRow">
          <TableHeaderCell>
            <span className="strong">Name</span>
          </TableHeaderCell>
          <TableHeaderCell>
            <span className="strong">Description</span>
          </TableHeaderCell>

          {showApiType && (
            <TableHeaderCell style={{ width: '8em' }}>
              <span className="strong">Type</span>
            </TableHeaderCell>
          )}
        </TableRow>
      </TableHeader>

      <TableBody>
        {renderBody()}
      </TableBody>
    </Table>
  );
};

export default React.memo(ApiListTableView);
