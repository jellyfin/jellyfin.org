import React, { memo, type ReactNode } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import { groupBlogSidebarItemsByYear } from '@docusaurus/plugin-content-blog/client';
import Heading from '@theme/Heading';
import type { Props } from '@theme/BlogSidebar/Content';
import { SiRss } from '@icons-pack/react-simple-icons';

function BlogSidebarYearGroup({
  year,
  yearGroupHeadingClassName,
  children
}: {
  year: string;
  yearGroupHeadingClassName?: string;
  children: ReactNode;
}) {
  return (
    <div role='group'>
      <Heading as='h3' className={yearGroupHeadingClassName}>
        {year}
      </Heading>
      {children}
    </div>
  );
}

function BlogSidebarContent({ items, yearGroupHeadingClassName, ListComponent }: Props): ReactNode {
  const themeConfig = useThemeConfig();
  return (
    <>
      {themeConfig.blog.sidebar.groupByYear ? (
        <>
          {groupBlogSidebarItemsByYear(items).map(([year, yearItems]) => (
            <BlogSidebarYearGroup key={year} year={year} yearGroupHeadingClassName={yearGroupHeadingClassName}>
              <ListComponent items={yearItems} />
            </BlogSidebarYearGroup>
          ))}
        </>
      ) : (
        <ListComponent items={items} />
      )}
      <div
        style={{
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--ifm-toc-border-color)'
        }}
      >
        <a
          href='https://jellyfin.org/index.xml'
          target='_blank'
          rel='noopener noreferrer'
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          aria-label='RSS Feed'
        >
          <SiRss size={18} />
          <span>RSS Feed</span>
        </a>
      </div>
    </>
  );
}

export default memo(BlogSidebarContent);
