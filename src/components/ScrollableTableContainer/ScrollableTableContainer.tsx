import React from 'react';
import classNames from 'classnames';
import styles from './ScrollableTableContainer.module.scss';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const ScrollableTableContainer: React.FC<Props> = ({ className, children }) => {
  return <div className={classNames(styles.scrollableTableContainer, className)}>{children}</div>;
};

export default React.memo(ScrollableTableContainer);
