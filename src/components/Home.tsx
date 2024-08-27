import React, { useState } from 'react';
import styled from 'styled-components';
import { Sidebar } from './Sidebar';
import { fetchProvidersList } from '../services/api';

const MainComponent = styled.div<{ isOpen: boolean }>`
  background-color: #42607b;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ isOpen }) =>
    isOpen &&
    `
    position: relative;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }
  `}
`;

const Container = styled.div`
  width: 100%;
  max-width: 250px;
`;

const ExploreButton = styled.button<{ isOpen: boolean }>`
  background-color: #00a1d4;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
  color: #ffffff;
  opacity: ${({ isOpen }) => (isOpen ? 0.5 : 1)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'none' : 'auto')};
`;

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = async () => {
    if (!isOpen) {
      await fetchProvidersList();
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <MainComponent
        isOpen={isOpen}
        onClick={() => {
          if (isOpen) toggleSidebar();
        }}
      >
        <Container>
          <ExploreButton onClick={toggleSidebar} isOpen={isOpen}>
            Explore Web APIs
          </ExploreButton>
        </Container>
      </MainComponent>
    </>
  );
};

export default Home;
