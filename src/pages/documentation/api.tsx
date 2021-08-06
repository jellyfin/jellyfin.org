import React from 'react';
import { RedocStandalone } from 'redoc';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Layout } from '../../components/Layout';
import schema from './jellyfin-openapi-stable.json';

const api = () => {
  return (
    <Layout>
      <Header />
      <header className="bg-gray-700 text-white py-4">
        <div className="container mx-auto flex flex-col p-2 lg:p-4">
          <h1 className="font-black text-5xl">API Reference</h1>
        </div>
      </header>
      <div className="flex flex-col flex-grow bg-white">
        <RedocStandalone
          spec={schema}
          options={{
            hideDownloadButton: true,
            hideHostname: true,
            sortPropsAlphabetically: true,
            sortEnumValuesAlphabetically: true,
            theme: {
              breakpoints: {
                small: '640px',
                medium: '768px',
                large: '1024px'
              },
              colors: {
                primary: { main: '#9d37c2' },
                success: { main: '#10B981', light: '#D1FAE5', dark: '#064E3B' },
                error: { main: '#EF4444', light: '#FEE2E2', dark: '#7F1D1D' },
                warning: { main: '#F59E0B', light: '#FEF3C7', dark: '#78350F' },
                http: {
                  get: '#10B981',
                  post: '#3B82F6',
                  head: '#8B5CF6',
                  delete: '#EF4444'
                }
              },
              typography: {
                fontSize: '1rem',
                lineHeight: '1.5',
                fontFamily:
                  'Lato, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                headings: {
                  fontFamily:
                    'Quicksand, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
                }
              },
              sidebar: {
                backgroundColor: '#F3F4F6'
              },
              rightPanel: {
                backgroundColor: '#1F2937'
              }
            }
          }}
        />
      </div>
      <Footer />
    </Layout>
  );
};

export default api;
