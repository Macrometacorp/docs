import React from 'react';
import Link from '@docusaurus/Link';

/* Styles */
import styles from './styles.module.css';

interface Card {
  description: string;
  heading: string;
  href: string;
}

export default function Card(props: Card): JSX.Element {
  return (
    <Link className={styles.cardWrapper} to={props.href}>
      <span className={styles.cardTitle}>{props.heading}</span>
      <span className={styles.cardDescription}>{props.description}</span>
    </Link>
  );
}
