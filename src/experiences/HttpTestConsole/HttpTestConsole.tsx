import React, { useCallback, useMemo, useState } from 'react';
import { xor } from 'lodash';
import { Accordion } from '@fluentui/react-components';
import { Stack } from '@fluentui/react';
import { getDefaultOpenItems } from '@/experiences/HttpTestConsole/utils';
import TestConsolePanel from './TestConsolePanel';
import ParamsListForm from './ParamsListForm';
import RawBody from './RawBody';
import RequestPreview from './RequestPreview';

const subComponents = {
  ParamsListForm,
  RawBody,
  RequestPreview,
  Panel: TestConsolePanel,
};

export interface Props {
  children: React.ReactNode;
}

type ResultType = React.NamedExoticComponent<Props> & typeof subComponents;

export const HttpTestConsole: React.FC<Props> = ({ children }) => {
  const [openItems, setOpenItems] = useState(getDefaultOpenItems(children));

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

        if (child.type === RawBody) {
          return React.cloneElement<React.ComponentProps<typeof RawBody>>(
            child as React.FunctionComponentElement<React.ComponentProps<typeof RawBody>>,
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
