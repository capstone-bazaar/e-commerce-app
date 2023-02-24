import React from 'react';
import Navbar from '../Navbar/Navbar';

export default function PageWithNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
