import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface DrawerInterface {
  open: boolean;
}

const DrawerWrapper = styled.div<DrawerInterface>`
  overflow-y: scroll;
  padding: 50px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform: ${(props) => (props.open ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 3;
`;

const Overlay = styled.div<DrawerInterface>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${(props) => (props.open ? 1 : 0)};
  pointer-events: ${(props) => (props.open ? 'auto' : 'none')};
  transition: opacity 0.3s ease-in-out;
  z-index: 3;
`;

const Drawer = ({
  isOpen,
  setDrawerIsOpen,
  children,
}: {
  isOpen: boolean;
  setDrawerIsOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  const handleToggle = () => {
    setDrawerIsOpen(!isOpen);
  };

  return (
    <>
      <Overlay open={isOpen} onClick={handleToggle} />
      <DrawerWrapper open={isOpen}>{children}</DrawerWrapper>
    </>
  );
};

export default Drawer;
