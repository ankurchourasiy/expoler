import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import { fetchProvidersList } from '../services/api';

// Define the styled components
const OverlayWrapper = styled.div<{ isOpen: boolean }>`
  background-color: #42607b;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  ${({ isOpen }) =>
    isOpen &&
    `
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

const ButtonContainer = styled.div`
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

  // Debounced function to fetch providers list
  const fetchProviders = useCallback(async () => {
    await fetchProvidersList();
  }, []);

  const toggleSidebar = async () => {
    if (!isOpen) {
      await fetchProviders();
    }
    setIsOpen(prevState => !prevState);
  };

  const handleOverlayClick = useCallback(() => {
    if (isOpen) {
      toggleSidebar();
    }
  }, [isOpen, toggleSidebar]);

  return (
    <>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <OverlayWrapper isOpen={isOpen} onClick={handleOverlayClick}>
        <ButtonContainer>
          <ExploreButton onClick={toggleSidebar} isOpen={isOpen}>
            Explore Web APIs
          </ExploreButton>
        </ButtonContainer>
      </OverlayWrapper>
    </>
  );
};

export default Home;
