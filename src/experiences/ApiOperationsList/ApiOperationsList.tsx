import React from 'react';
import { Stack } from '@fluentui/react';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';
import classNames from 'classnames';
import { TagGroup } from '@/types/common';
import { ApiOperation } from '@/types/apiOperation';
import { isTagGroupedList } from '@/utils/common';

export interface Props {
  operations: ApiOperation[] | Array<TagGroup<ApiOperation>>;
  selectedOperationName?: string;
  labelField?: 'urlTemplate' | 'displayName';
  allowLabelWrap?: boolean;
  defaultAllGroupTagsExpanded?: boolean;
  onOperationSelect: (operation: ApiOperation) => void;
}

export const ApiOperationsList: React.FC<Props> = ({
  operations,
  selectedOperationName,
  labelField = 'displayName',
  allowLabelWrap,
  defaultAllGroupTagsExpanded,
  onOperationSelect,
}) => {
  const isGrouped = isTagGroupedList<ApiOperation>(operations);

  function renderOperation(operation: ApiOperation): React.ReactNode {
    const isSelected = selectedOperationName === operation.name;

    return (
      <Stack
        key={operation.name}
        className={`operation ${isSelected && 'is-selected-operation'}`}
        horizontal
        onClick={() => onOperationSelect(operation)}
      >
        <span
          className={classNames(
            'operation-method',
            `method-${operation.method}`,
            isSelected && 'strong',
          )}
        >
          {operation.method}
        </span>

        <span
          className={classNames(
            'operation-name',
            !allowLabelWrap && 'nowrap',
            isSelected && 'strong'
          )}
        >
          {operation[labelField]}
        </span>
      </Stack>
    );
  }

  function renderContent() {
    if (!operations.length) {
      return <span>No operations found.</span>;
    }

    if (isGrouped) {
      return (
        <Accordion
          defaultOpenItems={defaultAllGroupTagsExpanded ? [...Array(operations.length).keys()] : []}
          multiple
          collapsible
        >
          {operations.map((tag, index) => (
            <AccordionItem key={tag.tag} value={index}>
              <AccordionHeader expandIconPosition="end">{tag.tag}</AccordionHeader>
              <AccordionPanel className="operation-accordion-panel">
                {tag.items.map((op) => renderOperation(op))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      );
    }

    return operations.map((op) => renderOperation(op));
  }

  return (
    <>
      {renderContent()}
    </>
  );
};

export default React.memo(ApiOperationsList);
