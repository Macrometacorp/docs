import React from 'react';

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}): JSX.Element {
  return (
    <footer
      className={`footer${style === 'dark' ? ' footer--dark' : ''}`}>
      <div>
        {links}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && <div className="margin-bottom--sm">{logo}</div>}
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
}
