import React from 'react';
import { Stack } from '@fluentui/react';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';
import classNames from 'classnames';
import { TagGroup } from '@/types/common';
import { ApiOperation } from '@/types/apiOperation';
import { isTagGroupedList } from '@/utils/common';
import styles from './ApiOperationsList.module.scss';

export interface Props {
  /** A list of API operations or API operations groups to display. */
  operations: ApiOperation[] | Array<TagGroup<ApiOperation>>;
  /** A name of currently selected operation. */
  selectedOperationName?: string;
  /** An operation data field that should be used as a label. */
  labelField?: 'urlTemplate' | 'displayName';
  /** If true - allow label to wrap to the next line. Otherwise - truncate the label. */
  allowLabelWrap?: boolean;
  /** If true - all group tags are expanded by default. Can be used only when operations are grouped. */
  defaultAllGroupTagsExpanded?: boolean;
  /** A callback that is called when an operation is selected. An entire operation object is passed as an argument. */
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
        className={classNames(
          styles.operation,
          isSelected && styles.isSelected,
          !allowLabelWrap && styles.nowrap,
        )}
        horizontal
        onClick={() => onOperationSelect(operation)}
      >
        <span
          className={classNames(
            styles.method,
            styles[operation.method.toLowerCase()],
          )}
        >
          {operation.method}
        </span>

        <span
          className={styles.name}
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
