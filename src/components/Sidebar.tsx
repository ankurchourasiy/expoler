import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    toggleSidebar();
  };

  return (
    <div
      className="collapsedSidebar"
      style={{
        position: 'fixed',
        top: 0,
        right: isOpen ? 0 : '-520px',
        width: '520px',
        height: '100%',
        backgroundColor: '#42607B',
        transition: 'right 0.3s ease',
        color: 'white',
        zIndex: 2,
        overflow: 'auto',
      }}
    >
      <div style={{ padding: '20px', borderLeft: '2px solid #0393f3' }}>
        <h2
          style={{ textAlign: 'center', fontWeight: '400', marginTop: '0px' }}
        >
          Select Provider
        </h2>
        {providers.map((item, index) => {
          const isActive = activeStates[index];
          return (
            <div className="accordion" key={index}>
              <div
                className={`accordion-item ${isActive ? 'accordianContainer' : ''}`}
              >
                <div
                  className="accordion-title"
                  onClick={() => handleAccordionClick(item, index)}
                >
                  <div className="accordion_title">{item}</div>
                  {isActive ? (
                    <img src={ArrowImg} alt="arrowup" className="arrowup" />
                  ) : (
                    <img src={ArrowImg} alt="arrowdown" className="arrowdown" />
                  )}
                </div>
                {isActive && (
                  <div className="">
                    {providerDetails[item]?.map((api, apiIndex) => (
                      <div
                        className="accordion-content"
                        key={apiIndex}
                        onClick={() => handleApiClick(item, apiIndex)}
                      >
                        <img src={Adobe} alt="" />
                        <p className="m-0">{api.title ?? 'No Data Found'}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
