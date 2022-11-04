import React from 'react';

/* Styles */
import styles from './styles.module.css';

interface Grid {
  cols: number,
  children: JSX.Element
}

export default function Grid(props: Grid): JSX.Element {
  const colClass = styles[`col${props.cols}`];
  return (
    <div className={`${styles.grid} ${colClass}`}>
      {props.children}
    </div>
  );
}
