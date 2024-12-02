import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArrowImg from '../assets/ArrowImg.png';
import Adixoo from '../assets/adixoo.jpg';
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

const SidebarWrapper = styled.div<SidebarProps>`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-520px')};
  width: 520px;
  height: 100%;
  background-color: #4b0082;
  transition: right 0.3s ease;
  color: #000000;
  z-index: 2;
  overflow: auto;
`;

const SidebarContent = styled.div`
  padding: 20px;
  border-left: 2px solid #0393f3;
`;

const AccordionSection = styled.div<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? '#1a2632' : 'transparent')};
  padding: 6px 0;
  border-radius: 8px;
  transition: 0.5s;
`;

const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  cursor: pointer;
`;

const AccordionItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  padding: 10px 12px;
`;

const RotateArrow = styled.img<{ isActive: boolean }>`
  transform: ${({ isActive }) =>
    isActive ? 'rotate(-180deg)' : 'rotate(0deg)'};
  transition: transform 0.5s ease;
  width: 10px;
  height: 6.42px;
  object-fit: cover;
`;

const SidebarTitle = styled.h2`
  text-align: center;
  font-weight: 400;
  margin: 0;
`;

const ApiLabel = styled.p`
  margin: 0;
`;

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
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
      try {
        const details = await fetchProviderDetails(provider);
        setProviderDetails(prevDetails => ({
          ...prevDetails,
          [provider]: details,
        }));
      } catch (error) {
        console.error('Error fetching provider details:', error);
      }
    }
  };

  const handleApiClick = (providerKey: string, apiIndex: number) => {
    const apiData = providerDetails[providerKey]?.[apiIndex];
    if (apiData) {
      navigate('/WebApiServiceDetails', { state: apiData });
      toggleSidebar(); // Ensure the sidebar is toggled
    }
  };

  return (
    <SidebarWrapper isOpen={isOpen} toggleSidebar={toggleSidebar}>
      <SidebarContent>
        <SidebarTitle> Data for the Api</SidebarTitle>
        {providers.map((item, index) => (
          <AccordionSection key={index} isActive={activeStates[index]}>
            <AccordionHeader onClick={() => handleAccordionClick(item, index)}>
              <div>{item}</div>
              <RotateArrow
                src={ArrowImg}
                alt="arrow"
                isActive={activeStates[index]}
              />
            </AccordionHeader>
            {activeStates[index] && (
              <div>
                {providerDetails[item]?.map((api, apiIndex) => (
                  <AccordionItem
                    key={apiIndex}
                    onClick={() => handleApiClick(item, apiIndex)}
                  >
                    <img src={Adixoo} alt="" />
                    <ApiLabel>{api.title ?? 'No Data Found'}</ApiLabel>
                  </AccordionItem>
                ))}
              </div>
            )}
          </AccordionSection>
        ))}
      </SidebarContent>
    </SidebarWrapper>
  );
};

export default Sidebar;
