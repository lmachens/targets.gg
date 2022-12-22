'use client';

import { initPlausible } from 'lib/analytics';
import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    initPlausible();
  }, []);

  return <></>;
}
