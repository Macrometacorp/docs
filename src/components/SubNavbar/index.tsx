import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';

/* Config */
import subnavs from '../../../subnavs';

/* Styles */
import styles from './styles.module.css';

function SubnavItems() {
  const location = useLocation();
  let subnavItems = [];
  let toRender = false;

  for (const prop in subnavs) {
    const {
      excludeBasePaths = [],
      includeBasePaths = [],
      items = []
    } = subnavs[prop];

    includeBasePaths.forEach(path => {
      if (location.pathname.startsWith(path)) {
        subnavItems = items;
        toRender = true;
      }
    });

    excludeBasePaths.forEach(path => {
      if (location.pathname.startsWith(path)) {
        toRender = false;
      }
    });
  }

  if (toRender) {
    return (
      <div className={styles.subnav}>
        <ul className={styles.subnavLeft}>
          {subnavItems.map((item: any, i) => (
            <li key={i}>
              <Link
                className={`
                  ${styles.navLink} 
                  ${item.href === '/' && location.pathname === '/' ? styles.navLinkActive : ''} 
                  ${item.href !== '/' && location.pathname.startsWith(item.href) ? styles.navLinkActive : ''} 
                `}
                to={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return (<></>);
}

export default function SubNavbar(): JSX.Element {
  return (
    <div>
      <SubnavItems />
    </div>
  );
}
