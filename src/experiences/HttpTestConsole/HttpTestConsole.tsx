import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { difference, xor } from 'lodash';
import { Accordion } from '@fluentui/react-components';
import { Stack } from '@fluentui/react';
import { getDefaultOpenItems, resolveHttpReqData } from '@/experiences/HttpTestConsole/utils';
import TestConsolePanel from './TestConsolePanel';
import ParamsListForm from './ParamsListForm';
import BodyForm from './BodyForm';
import RequestPreview from './RequestPreview';

const subComponents = {
  resolveHttpReqData,
  ParamsListForm,
  BodyForm,
  RequestPreview,
  Panel: TestConsolePanel,
};

export interface Props {
  children: React.ReactNode;
}

type ResultType = React.NamedExoticComponent<Props> & typeof subComponents;

export const HttpTestConsole: React.FC<Props> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [panelNames, setPanelNames] = useState([]);
  const [openItems, setOpenItems] = useState([]);

  // Detect new panels appearance and expand them if needed
  useEffect(() => {
    const childrenArr = React.Children.toArray(children);
    const currentNames = childrenArr
      .filter((child) => React.isValidElement(child))
      .map((child) => (child as React.ReactElement).props.name);
    let newPanels = [];

    setPanelNames((prev) => {
      newPanels = difference(currentNames, prev);
      return currentNames;
    });

    setOpenItems((prev) =>
      prev.concat(
        getDefaultOpenItems(
          childrenArr.filter((child) => !React.isValidElement(child) || newPanels.includes(child.props.name))
        )
      )
    );
  }, [children]);

  const handlePanelToggle = useCallback<React.ComponentProps<typeof Accordion>['onToggle']>((_, data) => {
    setOpenItems((prev) => xor(prev, [String(data.value)]));
  }, []);

  // Wrapper for collapsible panels onChange prop that will automatically open the panel on value change if it was not open already
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrapOnChangeWithAutoPanelOpen = useCallback(<T extends any[], U>(name: string, cb: (...args: T) => U) => {
    return (...args: T): U => {
      setOpenItems((prev) => (prev.includes(name) ? prev : [...prev, name]));
      return cb(...args);
    };
  }, []);

  const extendedChildren = useMemo(
    () =>
      React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        if (child.type === ParamsListForm) {
          return React.cloneElement<React.ComponentProps<typeof ParamsListForm>>(
            child as React.FunctionComponentElement<React.ComponentProps<typeof ParamsListForm>>,
            {
              onChange: wrapOnChangeWithAutoPanelOpen(child.props.name, child.props.onChange),
            }
          );
        }

        if (child.type === BodyForm) {
          return React.cloneElement<React.ComponentProps<typeof BodyForm>>(
            child as React.FunctionComponentElement<React.ComponentProps<typeof BodyForm>>,
            {
              onChange: wrapOnChangeWithAutoPanelOpen(child.props.name, child.props.onChange),
            }
          );
        }

        return child;
      }),
    [children, wrapOnChangeWithAutoPanelOpen]
  );

  return (
    <Accordion openItems={openItems} collapsible multiple onToggle={handlePanelToggle}>
      <Stack tokens={{ childrenGap: 32 }}>{extendedChildren}</Stack>
    </Accordion>
  );
};

const HttpTestConsoleMemo = React.memo(HttpTestConsole);
HttpTestConsoleMemo.displayName = 'HttpTestConsole';

export default Object.assign(HttpTestConsoleMemo, subComponents) as ResultType;
