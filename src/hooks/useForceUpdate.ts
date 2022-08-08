import { useCallback, useState } from 'react';

export const useForceUpdate = () => {
  const [, setValue] = useState(0);
  const refresh = useCallback(() => setValue(value => value + 1), []);

  return refresh;
};
