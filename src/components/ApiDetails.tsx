import React, { useState } from 'react';
import adobeImg from '../assets/AdobeBig.png';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import styled from 'styled-components';

const ProductDetailsContainer = styled.div`
  background-color: #42607b;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const ProductDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 58px;
  justify-content: center;
`;

const ProductImg = styled.div`
  img {
    width: 120px;
    height: 120px;
  }
`;

const ProductName = styled.div`
  h1 {
    font-size: 32px;
    color: #ffffff;
    font-weight: 400;
  }
`;

const ProductDescription = styled.div`
  margin-top: 40px;
  width: 100%;
  max-width: 1200px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Details = styled.div`
  margin-top: 40px;

  h1 {
    font-size: 24px;
    font-weight: 400;
    color: #ffffff;
    margin: 0;
    margin-bottom: 12px;
  }

  p {
    font-size: 16px;
    font-weight: 400;
    margin: 0;
    color: #ffffff;
  }
`;

const ContactDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  h1 {
    margin: 0;
    font-size: 16px;
    font-weight: lighter;
  }

  p {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
  }
`;

const ProductContainer = styled.div`
  width: 100%;
  max-width: 250px;
  margin: 30px auto;
  position: relative;
`;

const ExploreBtn = styled.button`
  background-color: #00a1d4;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
  color: #ffffff;
  display: block;
  margin: 0 auto;
  position: fixed; /* Changed from absolute to fixed */
  bottom: 20px; /* Adjust this value as needed */
  left: 50%;
  transform: translateX(-50%);
`;

const DataNotFound = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-size: 18px;
`;

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
        <ProductDetailsContainer>
          <ProductDetails>
            <ProductImg>
              <img src={adobeImg} alt="API Logo" />
            </ProductImg>
            <ProductName>
              <h1>{propsData.title}</h1>
            </ProductName>
          </ProductDetails>
          <ProductDescription>
            <Details>
              <h1>Description</h1>
              <p>{propsData.description ?? 'Description Not Found'}</p>
            </Details>
            <Details>
              <h1>Swagger</h1>
              <p>{propsData['x-origin']?.[0]?.url ?? 'URL Not Found'}</p>
            </Details>
            <Details>
              <h1>Contact</h1>
              <ContactDetails>
                <h1>Email</h1>
                <p>{propsData.contact?.email ?? 'Email Not Found'}</p>
              </ContactDetails>
              <ContactDetails>
                <h1>Name</h1>
                <p>{propsData.contact?.name ?? 'Name Not Found'}</p>
              </ContactDetails>
              <ContactDetails>
                <h1>Url</h1>
                <p>{propsData.contact?.url ?? 'URL Not Found'}</p>
              </ContactDetails>
            </Details>
          </ProductDescription>
          <ProductContainer>
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <ExploreBtn
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                toggleSidebar();
              }}
              disabled={isOpen}
            >
              Explore more APIs
            </ExploreBtn>
          </ProductContainer>
        </ProductDetailsContainer>
      ) : (
        <DataNotFound>No Data Found</DataNotFound>
      )}
    </>
  );
};

export default WebApiServiceDetails;
