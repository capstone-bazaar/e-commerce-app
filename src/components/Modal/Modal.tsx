import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

// Modal bileşeni
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  top: 0;
  left: 0;
  background-color: #fff;
  min-height: 300px;
  padding: 30px;
  border-radius: 20px;
`;

export default function Modal({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  const modalContentRef = useRef<HTMLDivElement>(null);

  //eslint-disable-next-line
  const handleClickOutside = (e: any) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target)
    ) {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

    //eslint-disable-next-line
  }, []);

  return (
    <ModalWrapper>
      <ModalContent ref={modalContentRef}>{children}</ModalContent>
    </ModalWrapper>
  );
}
