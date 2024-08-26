import React, { useState } from 'react';
import adobeImg from '../assets/AdobeBig.png';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';

interface ContactInfo {
  email?: string;
  name?: string;
  url?: string;
}

interface ProviderData {
  title?: string;
  description?: string;
  'x-origin'?: { url?: string }[];
  contact?: ContactInfo;
}

const WebApiServiceDetails: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();
  const propsData = location.state as ProviderData;

  return (
    <>
      {propsData?.title ? (
        <div className="productDetailsContainer">
          <div className="productDetails">
            <div className="productImg">
              <img src={adobeImg} alt="API Logo" />
            </div>
            <div className="productName">
              <h1>{propsData.title}</h1>
            </div>
          </div>
          <div className="productDescription">
            <div className="details">
              <h1>Description</h1>
              <p>{propsData.description ?? 'Description Not Found'}</p>
            </div>
            <div className="details">
              <h1>Swagger</h1>
              <p>{propsData['x-origin']?.[0]?.url ?? 'URL Not Found'}</p>
            </div>
            <div className="details">
              <h1>Contact</h1>
              <div className="contactDetails">
                <h1>Email</h1>
                <p>{propsData.contact?.email ?? 'Email Not Found'}</p>
              </div>
              <div className="contactDetails">
                <h1>Name</h1>
                <p>{propsData.contact?.name ?? 'Name Not Found'}</p>
              </div>
              <div className="contactDetails">
                <h1>Url</h1>
                <p>{propsData.contact?.url ?? 'URL Not Found'}</p>
              </div>
            </div>
          </div>
          <div className="productContainer">
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div
              className={isOpen ? 'mainComponent backdrop' : 'productContainer'}
              onClick={() => {
                if (isOpen) toggleSidebar();
              }}
            >
              <div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleSidebar();
                  }}
                  className={isOpen ? 'hidden' : 'exploreBtn'}
                  disabled={isOpen}
                >
                  Explore more APIs
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="datanotfound">No Data Found</p>
      )}
    </>
  );
};

export default WebApiServiceDetails;
