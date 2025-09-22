import React, { type ReactNode } from 'react';
import Tabs from '@theme-original/Tabs';
import type TabsType from '@theme/Tabs';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof TabsType>;

export default function TabsWrapper(props: Props): ReactNode {
  return (
    <div className='tabs-container tablist'>
      <Tabs {...props} />
    </div>
  );
}
