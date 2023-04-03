import React from 'react';
import styled from 'styled-components';
const Link = styled.a`
  cursor: pointer;
  color: #ea004b;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default function TextButton({
  href,
  children,
  target,
}: {
  href?: string;
  children: React.ReactNode;
  target?: string;
}) {
  return (
    <Link target={target ? target : '_self'} href={href}>
      {children}
    </Link>
  );
}
