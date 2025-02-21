import React from 'react';
import { AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';
import classNames from 'classnames';
import styles from './TestConsolePanel.module.scss';

export interface Props {
  /** An optional class name to be applied to panel's root */
  className?: string;
  /** Panel's name unique to current test console (used for handling its state only and not displayed anywhere). */
  name: string;
  /** Panel header */
  header: React.ReactNode;
  /** Panel content */
  children: React.ReactNode;
  /** If true - the panel will be open by default */
  isOpenByDefault?: boolean;
}

export const TestConsolePanel: React.FC<Props> = ({ className, name, header, children }) => {
  return (
    <AccordionItem className={classNames(styles.testConsolePanel, className, 'operation-table')} value={name}>
      <AccordionHeader className={classNames(styles.header, 'operation-table-header')}>{header}</AccordionHeader>
      <AccordionPanel className={classNames(styles.content, 'operation-table-body-console')}>{children}</AccordionPanel>
    </AccordionItem>
  );
};

const TestConsolePanelMemo = React.memo(TestConsolePanel);
TestConsolePanelMemo.displayName = 'HttpTestConsole.Panel';

export default TestConsolePanelMemo;
