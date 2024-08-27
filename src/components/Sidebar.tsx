import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArrowImg from '../assets/ArrowImg.png';
import Adobe from '../assets/Adobe.png';
import { fetchProvidersList, fetchProviderDetails } from '../services/api';

interface ProviderInfo {
  title?: string;
  [key: string]: unknown;
}

interface ProvidersData {
  [key: string]: ProviderInfo[];
}

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContainer = styled.div<SidebarProps>`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-520px')};
  width: 520px;
  height: 100%;
  background-color: #42607b;
  transition: right 0.3s ease;
  color: white;
  z-index: 2;
  overflow: auto;
`;

const ContentWrapper = styled.div`
  padding: 20px;
  border-left: 2px solid #0393f3;
`;

const AccordionItem = styled.div<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? '#1a2632' : 'transparent')};
  padding: 6px 0;
  border-radius: 8px;
  transition: 0.5s;
`;

const AccordionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  cursor: pointer;
`;

const AccordionContent = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  padding: 10px 12px;
`;

const Arrow = styled.img<{ isActive: boolean }>`
  transform: ${({ isActive }) =>
    isActive ? 'rotate(-180deg)' : 'rotate(0deg)'};
  transition: transform 0.5s ease;
  width: 10px;
  height: 6.42px;
  object-fit: cover;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 400;
  margin: 0;
`;

const ApiTitle = styled.p`
  margin: 0;
`;

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [providers, setProviders] = useState<string[]>([]);
  const [providerDetails, setProviderDetails] = useState<ProvidersData>({});
  const [activeStates, setActiveStates] = useState<boolean[]>([]);
  const navigate = useNavigate();

  const getListOfProviders = useCallback(async () => {
    try {
      const providerList = await fetchProvidersList();
      setProviders(providerList);
      setActiveStates(new Array(providerList.length).fill(false));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      getListOfProviders();
    }
  }, [isOpen, getListOfProviders]);

  const handleAccordionClick = async (provider: string, index: number) => {
    setActiveStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });

    if (!providerDetails[provider]) {
      const details = await fetchProviderDetails(provider);
      setProviderDetails(data => ({
        ...data,
        [provider]: details,
      }));
    }
  };

  const handleApiClick = (providerKey: string, apiIndex: number) => {
    const apiData = providerDetails[providerKey]?.[apiIndex];
    navigate('/WebApiServiceDetails', { state: apiData });
    toggleSidebar(); // Ensure the sidebar is toggled
  };

  return (
    <SidebarContainer isOpen={isOpen} toggleSidebar={toggleSidebar}>
      <ContentWrapper>
        <Title>Select Provider</Title>
        {providers.map((item, index) => {
          const isActive = activeStates[index];
          return (
            <AccordionItem isActive={isActive} key={index}>
              <AccordionTitle onClick={() => handleAccordionClick(item, index)}>
                <div>{item}</div>
                <Arrow src={ArrowImg} alt="arrow" isActive={isActive} />
              </AccordionTitle>
              {isActive && (
                <div>
                  {providerDetails[item]?.map((api, apiIndex) => (
                    <AccordionContent
                      key={apiIndex}
                      onClick={() => handleApiClick(item, apiIndex)}
                    >
                      <img src={Adobe} alt="" />
                      <ApiTitle>{api.title ?? 'No Data Found'}</ApiTitle>
                    </AccordionContent>
                  ))}
                </div>
              )}
            </AccordionItem>
          );
        })}
      </ContentWrapper>
    </SidebarContainer>
  );
};
