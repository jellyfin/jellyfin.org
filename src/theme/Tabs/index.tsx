import React, { type ReactNode } from 'react';
import Tabs from '@theme-original/Tabs';
import type TabsType from '@theme/Tabs';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof TabsType>;

const tabListStyle: React.CSSProperties = {
  border: '2px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '8px',
  padding: '16px'
};

export default function TabsWrapper(props: Props): ReactNode {
  return (
    <div style={tabListStyle}>
      <Tabs {...props} />
    </div>
  );
}
