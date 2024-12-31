import React, { useState } from 'react';
import { Stack } from '@fluentui/react';
import { Button } from '@fluentui/react-components';
import { Api } from '@/types/api';
import { TagGroup } from '@/types/common';
import { isTagGroupedList } from '@/utils/common';
import { toggleSetValue } from '@/utils/toggleSetValue';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import ExpandIcon from '@/components/ExpandIcon';
import styles from './ApiListCardsView.module.scss';

export interface Props {
  apis: Api[] | Array<TagGroup<Api>>;
  showApiType?: boolean;
  apiLinkPropsProvider: (api: Api) => React.HTMLProps<HTMLAnchorElement>;
}

const MD_MAX_LENGTH = 250;

export const ApiListCardsView: React.FC<Props> = ({ apis, showApiType, apiLinkPropsProvider }) => {
  const [expandedTags, setExpandedTags] = useState(new Set<string>());
  const isGrouped = isTagGroupedList<Api>(apis);

  function renderApiCards(apis: Api[]) {
    if (!apis.length) {
      return <span style={{ textAlign: 'center' }}>No APIs to display</span>;
    }

    return (
      <div className={styles.apiCards}>
        {apis.map((api) => (
          <div key={api.name} className={styles.card}>
            <div style={{ height: '100%' }}>
              {showApiType && (
                <div className={styles.tags}>
                  <span>API</span>
                  <span>{api.type}</span>
                </div>
              )}
              <h4>{api.displayName}</h4>

              <MarkdownRenderer markdown={api.description} maxLength={MD_MAX_LENGTH} />
            </div>

            <Stack horizontal>
              <a
                title={api.displayName}
                {...apiLinkPropsProvider(api)}
              >
                <Button>Go to API</Button>
              </a>
            </Stack>
          </div>
        ))}
      </div>
    );
  }

  if (!isGrouped) {
    return renderApiCards(apis);
  }

  return (
    <div className={styles.tagsContainer}>
      {apis.map(({ tag, items }) => (
        <div key={tag}>
          <Button
            className={styles.expandBtn}
            icon={<ExpandIcon isExpanded={expandedTags.has(tag)} />}
            onClick={() => setExpandedTags(old => toggleSetValue(old, tag))}
          >
            <span className="strong" style={{ marginLeft: '.5rem' }}>
              {tag}
            </span>
          </Button>

          {expandedTags.has(tag) && renderApiCards(items)}
        </div>
      ))}
    </div>
  );
};

export default React.memo(ApiListCardsView);
