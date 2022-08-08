/* eslint-disable react-hooks/exhaustive-deps */

import { useRouter } from 'next/router';
import { useEffect } from 'react';

function useDidMount(func: () => void) {
  useEffect(() => {
    func();
  }, []);
}

function usePageDidMount<T>(func: () => void, args: T[] = []) {
  const { isReady } = useRouter();

  useEffect(() => {
    if (isReady) func();
  }, [isReady, ...args]);
}

export { useDidMount, usePageDidMount };
