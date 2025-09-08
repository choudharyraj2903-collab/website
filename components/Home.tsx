'use client';

import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

// Type definitions
interface Asset {
  src: string;
  type: 'image';
}

interface BackgroundAssetProps {
  active: boolean;
  index: number;
  src: string;
}

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  href: string;
  children: React.ReactNode;
}

// Styled components
const Container = styled.div`
  height: 90vh;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
`;

const BackgroundAsset = styled.div<BackgroundAssetProps>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transform: ${(props) =>
    props.active ? 'scale(1.05) translateX(0)' : props.index % 2 === 0 ? 'scale(1.1) translateX(20px)' : 'scale(1.1) translateX(-20px)'};
  transition: opacity 1.5s ease-in-out, transform 8s ease;
  z-index: ${(props) => (props.active ? 1 : 0)};
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.1) 100%);
  z-index: 2;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-height: 100vh;
  text-align: left;
  padding: 0 5%;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #f5f5f5;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #e0e0e0;
  margin-bottom: 2.5rem;
  max-width: 650px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.25rem;
`;

const Button = styled.a<ButtonProps>`
  padding: 1.25rem 3rem;
  border-radius: 9999px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 1.125rem;
  border: 2px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;

  ${(props) =>
    props.variant === 'primary' &&
    css`
      background-color: #fff;
      color: #000;
      &:hover {
        background-color: #1e40af;
        color: #fff;
      }
    `}

  ${(props) =>
    props.variant === 'secondary' &&
    css`
      background-color: transparent;
      border: 2px solid #fff;
      color: #fff;
      &:hover {
        background-color: #1e40af;
        color: #fff;
        border-color: #1e40af;
      }
    `}
`;

export default function Home(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const assets: Asset[] = [
    { src: '/homeAssets/image1.webp', type: 'image' },
    { src: '/homeAssets/image3.jpg', type: 'image' },
    { src: '/homeAssets/image2.jpg', type: 'image' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % assets.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [assets.length]);

  return (
    <Container>
      {assets.map((asset, index) => (
        <BackgroundAsset key={asset.src} src={asset.src} active={index === currentIndex} index={index} />
      ))}
      <GradientOverlay />
      <ContentWrapper>
        <Title>SPO IIT Kanpur</Title>
        <Subtitle>
          The Student Placement Office connects students with career opportunities, recruiters, and mentors for a brighter future.
        </Subtitle>
        <ButtonGroup>
          <Button href="https://placement.iitk.ac.in/" variant="primary">
            RAS Portal
          </Button>
          <Button href="https://spo.iitk.ac.in/placement-coordinators" variant="secondary">
            Contact
          </Button>
        </ButtonGroup>
      </ContentWrapper>
    </Container>
  );
}
