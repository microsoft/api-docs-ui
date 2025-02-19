import React, { useCallback, useMemo, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Liquid } from 'liquidjs';
import { Button, Dropdown, Option, Tooltip } from '@fluentui/react-components';
import { Stack } from '@fluentui/react';
import { EyeOffRegular, EyeRegular } from '@fluentui/react-icons';
import { HttpReqData, HttpParamSchemasByLocation } from '@/types/testConsole';
import CopyToClipboard from '@/experiences/CopyToClipboard';
import { normalizeReqData, resolveUrlFromReqData } from '../utils';
import TestConsolePanel from '../TestConsolePanel';
import { getFluentProviderRoot } from '@/utils/fluent';
import templates from './templates';

export interface Props {
  /** Panel's name unique to current test console (used for handling its state only and not displayed anywhere). */
  name: string;
  /** Panel title. */
  title?: string;
  /** Http request data. */
  reqData: HttpReqData;
  /** Schemas to resolve request parameters. */
  schemas: HttpParamSchemasByLocation;
}

const REQUEST_LANGUAGES = [
  { value: 'http', label: 'HTTP' },
  { value: 'csharp', label: 'C#' },
  { value: 'curl', label: 'Curl' },
  { value: 'java', label: 'Java' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'php', label: 'PHP' },
  { value: 'python', label: 'Python' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
];

type Languages = keyof typeof templates;

function renderCode(language: Languages, reqData: HttpReqData): string {
  const liquid = new Liquid();

  return liquid
    .parseAndRenderSync(templates[language], {
      request: reqData,
      resolvedUrl: resolveUrlFromReqData(reqData),
    })
    .trim();
}

export const RequestPreview: React.FC<Props> = ({ name, title = 'HTTP Request', reqData, schemas }) => {
  const [showSecrets, setShowSecrets] = useState(false);
  const [language, setLanguage] = useState<Languages>('http');

  const selectedLanguageEntry = useMemo(() => REQUEST_LANGUAGES.find((lang) => lang.value === language), [language]);

  const code = useMemo(
    () => renderCode(language, normalizeReqData(reqData, schemas, showSecrets)),
    [language, reqData, schemas, showSecrets]
  );

  // Code for copy should always show secrets
  const codeForCopy = useMemo(
    () => renderCode(language, normalizeReqData(reqData, schemas, true)),
    [language, reqData, schemas]
  );

  const hasSecrets = useMemo(() => {
    return (
      renderCode(language, normalizeReqData(reqData, schemas, true)) !==
      renderCode(language, normalizeReqData(reqData, schemas, false))
    );
  }, [language, reqData, schemas]);

  const handleLanguageChange = useCallback<React.ComponentProps<typeof Dropdown>['onOptionSelect']>(
    (_, { optionValue }) => {
      setLanguage(optionValue as Languages);
    },
    []
  );

  const handleSecretsToggle = useCallback(() => {
    setShowSecrets((prev) => !prev);
  }, []);

  return (
    <TestConsolePanel name={name} header={title}>
      <Stack tokens={{ childrenGap: 3 }} horizontal>
        <Dropdown
          aria-label="Language"
          value={selectedLanguageEntry?.label}
          selectedOptions={[language]}
          placeholder="Select language"
          className="request-language-dropdown"
          inlinePopup
          onOptionSelect={handleLanguageChange}
        >
          {REQUEST_LANGUAGES.map((language) => (
            <Option key={language.value} value={language.value}>
              {language.label}
            </Option>
          ))}
        </Dropdown>

        <CopyToClipboard appearance="subtle" content={codeForCopy} />
        {hasSecrets && (
          <Tooltip
            content={showSecrets ? 'Hide secrets' : 'Reveal secrets'}
            mountNode={getFluentProviderRoot()}
            relationship="label"
          >
            <Button
              icon={showSecrets ? <EyeOffRegular /> : <EyeRegular />}
              appearance="subtle"
              onClick={handleSecretsToggle}
            />
          </Tooltip>
        )}
      </Stack>

      <SyntaxHighlighter language={language} style={a11yLight}>
        {code}
      </SyntaxHighlighter>
    </TestConsolePanel>
  );
};

const RequestPreviewMemo = React.memo(RequestPreview);
RequestPreviewMemo.displayName = 'HttpTestConsole.RequestPreview';

export default RequestPreviewMemo;
