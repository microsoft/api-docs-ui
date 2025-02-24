import React from 'react';
import classNames from 'classnames';
import { Stack } from '@fluentui/react';
import { Button } from '@fluentui/react-components';
import MarkdownRenderer from '@/experiences/MarkdownRenderer';
import { Api } from '@/types/api';
import styles from './ApiCard.module.scss';

export interface Props {
  /** API data. */
  api: Api;
  /** Label of card link. */
  linkLabel?: string;
  /** Additional link props. You can pass here props like className, href, onClick etc. */
  linkProps?: React.HTMLProps<HTMLAnchorElement>;
  /** If true - show the API type in card.*/
  showType?: boolean;
}

const MD_MAX_LENGTH = 250;

export const ApiCard: React.FC<Props> = ({ api, showType, linkLabel = 'Go to API', linkProps }) => {
  return (
    <div key={api.name} className={classNames(styles.apiCard, 'fui-list-card')}>
      <div style={{ height: '100%' }}>
        {showType && (
          <div className={classNames(styles.tags, 'fui-list-card-tags')}>
            <span>API</span>
            {!!api.type && <span>{api.type}</span>}
          </div>
        )}
        <h4>{api.displayName}</h4>

        <MarkdownRenderer markdown={api.description} maxLength={MD_MAX_LENGTH} />
      </div>

      <Stack horizontal>
        <a {...linkProps} className={classNames('button', linkProps?.className)} role="button" title={api.displayName}>
          <Button>{linkLabel}</Button>
        </a>
      </Stack>
    </div>
  );
};

export default React.memo(ApiCard);
