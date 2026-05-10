import React, { memo, type ReactNode } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import { groupBlogSidebarItemsByYear } from '@docusaurus/plugin-content-blog/client';
import Heading from '@theme/Heading';
import type { Props } from '@theme/BlogSidebar/Content';
import { SiRss } from '@icons-pack/react-simple-icons';
import styles from './styles.module.css';

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

function getBlogBasePath(items: Props['items']): string {
  const firstItem = items[0];
  if (!firstItem || !('permalink' in firstItem)) {
    return '/posts';
  }
  const permalink = firstItem.permalink;
  return permalink.substring(0, permalink.lastIndexOf('/'));
}

function BlogSidebarContent({ items, yearGroupHeadingClassName, ListComponent }: Props): ReactNode {
  const themeConfig = useThemeConfig();
  const blogBasePath = getBlogBasePath(items);
  const rssPath = `${blogBasePath}/rss.xml`;
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
      <div className={styles.rssContainer}>
        <a href={rssPath} target='_blank' rel='noopener noreferrer' className={styles.rssLink} aria-label='RSS Feed'>
          <SiRss size={14} className={styles.rssIcon} />
          <span>RSS Feed</span>
        </a>
      </div>
    </>
  );
}

export default memo(BlogSidebarContent);
