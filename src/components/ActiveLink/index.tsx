import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, cloneElement, useEffect, useState } from 'react';

import { Props } from './types';

const ActiveLink: FC<Props> = ({
  children,
  shouldMatchExactHref = false,
  ...rest
}) => {
  const { asPath } = useRouter();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
      setIsActive(true);
    }

    if (
      !shouldMatchExactHref &&
      (asPath.startsWith(String(rest.href)) ||
        asPath.startsWith(String(rest.as)))
    ) {
      setIsActive(true);
    }
  }, [shouldMatchExactHref, asPath, rest.href, rest.as]);

  return (
    <Link {...rest}>
      {cloneElement(children, { color: isActive ? 'blue.400' : 'gray.500' })}
    </Link>
  );
};

export { ActiveLink };
