import React from 'react';
import { inject } from '@vercel/analytics';

export default function Root({ children }) {
  inject();
  return (
    <>{children}</>
  );
}
