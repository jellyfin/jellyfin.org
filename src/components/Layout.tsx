import React from 'react';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">{children}</div>
  );
};

export const LandingPage = ({ children }) => {
  return <div className="min-h-screen flex flex-col">{children}</div>;
};
