import React from 'react';
import classNames from 'classnames';
import styles from './ApiOperationMethod.module.scss';

export interface Props {
  /** An optional class name to be applied to the label */
  className?: string;
  /** An API method */
  method: string;
}

export const ApiOperationMethod: React.FC<Props> = ({ className, method }) => {
  return (
    <span className={classNames(styles.apiOperationMethod, styles[method.toLowerCase()], className)}>{method}</span>
  );
};

export default React.memo(ApiOperationMethod);
