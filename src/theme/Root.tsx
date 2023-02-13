import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { reportWebVitals } from '../vitals';

export default function Root({ children }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}

reportWebVitals();
