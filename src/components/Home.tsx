import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { fetchProvidersList } from '../services/api';

const Home: React.FC = () => {
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
      <div
        className={isOpen ? 'mainComponent backdrop' : 'mainComponent'}
        onClick={() => {
          if (isOpen) toggleSidebar();
        }}
      >
        <div className="container">
          <button
            onClick={toggleSidebar}
            className="exploreBtn"
            disabled={isOpen}
          >
            Explore Web APIs
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
