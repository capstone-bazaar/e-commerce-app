import React from 'react';
import Navbar from '../Navbar/Navbar';

export default function PageWithNavbar({
  children,
  button,
}: {
  children: React.ReactNode;
  button?: React.ReactNode;
}) {
  return (
    <div>
      <Navbar button={button} />
      {children}
    </div>
  );
}
