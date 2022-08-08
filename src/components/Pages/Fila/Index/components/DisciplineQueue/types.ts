import { PropsWithChildren } from 'react';

import { Semester } from '@models/Semester';

export interface BaseProps {
  semester: Semester;
}

export type Props = PropsWithChildren<BaseProps>;
