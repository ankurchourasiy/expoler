import React, { useState, useCallback } from 'react';
import adixooImg from '../assets/adixoo.jpg';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import styled from 'styled-components';

// Styled components with updated names
const PageContainer = styled.div`
  background-color: #4b0082;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const ProductHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 58px;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  img {
    width: 120px;
    height: 120px;
  }
`;

const TitleWrapper = styled.div`
  h1 {
    font-size: 32px;
    color: #4b0082;
    font-weight: 400;
  }
`;

const DescriptionWrapper = styled.div`
  margin-top: 40px;
  width: 100%;
  max-width: 1200px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Section = styled.div`
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

const ContactSection = styled.div`
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

const SidebarWrapper = styled.div`
  width: 100%;
  max-width: 250px;
  margin: 30px auto;
  position: relative;
`;

const ExploreButton = styled.button`
  background-color: #da70d6;
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
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

const NoDataMessage = styled.p`
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
  const location = useLocation();
  const propsData = location.state as ProviderData;

  const toggleSidebar = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  if (!propsData?.title) {
    return <NoDataMessage>No Data Found</NoDataMessage>;
  }

  return (
    <PageContainer>
      <ProductHeader>
        <ImageWrapper>
          <img src={adixooImg} alt="API Logo" />
        </ImageWrapper>
        <TitleWrapper>
          <h1>{propsData.title}</h1>
        </TitleWrapper>
      </ProductHeader>
      <DescriptionWrapper>
        <Section>
          <h1>Description</h1>
          <p>{propsData.description ?? 'Description Not Found'}</p>
        </Section>
        <Section>
          <h1>Swagger</h1>
          <p>{propsData['x-origin']?.[0]?.url ?? 'URL Not Found'}</p>
        </Section>
        <Section>
          <h1>Contact</h1>
          <ContactSection>
            <h1>Email</h1>
            <p>{propsData.contact?.email ?? 'Email Not Found'}</p>
          </ContactSection>
          <ContactSection>
            <h1>Name</h1>
            <p>{propsData.contact?.name ?? 'Name Not Found'}</p>
          </ContactSection>
          <ContactSection>
            <h1>Url</h1>
            <p>{propsData.contact?.url ?? 'URL Not Found'}</p>
          </ContactSection>
        </Section>
      </DescriptionWrapper>
      <SidebarWrapper>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <ExploreButton
          onClick={e => {
            e.stopPropagation();
            toggleSidebar();
          }}
          disabled={isOpen}
        >
          Explore more APIs
        </ExploreButton>
      </SidebarWrapper>
    </PageContainer>
  );
};

export default WebApiServiceDetails;
