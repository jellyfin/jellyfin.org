import React from 'react';
import { useLocation } from '@docusaurus/router';
import Banner from '../components/banner/Banner';

// The root view wrapper for the entire app
export default function Root({ children }: { children: React.ReactNode }) {
  const isInDevelopersSection = useLocation().pathname.startsWith('/developers');

  return <>
    {isInDevelopersSection && <Banner text="This page is still a work in progress. Some content may be incomplete." />}
    {children}
  </>;
}