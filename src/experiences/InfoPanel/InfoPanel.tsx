import React from 'react';
import classNames from 'classnames';
import styles from './InfoPanel.module.scss';

export interface Props {
  className?: string;
  title: string;
  children: React.ReactNode;
}

export const InfoPanel: React.FC<Props> = ({ className, title, children }) => {
  return (
    <div className={classNames(styles.infoPanel, className)}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default React.memo(InfoPanel);
