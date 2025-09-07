'use client';

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const assets = [
    { src: '/homeAssets/image1.webp', type: 'image' },
    { src: '/homeAssets/image3.jpg', type: 'image' },
    { src: '/homeAssets/image2.jpg', type: 'image' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % assets.length);
    }, 5000); // every 5s
    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    height: '90vh',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Inter', sans-serif",
  };

  const backgroundAssetStyle = (src, active, index) => ({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: active ? 1 : 0,
    transform: active ? 'scale(1.05) translateX(0)' : index % 2 === 0 ? 'scale(1.1) translateX(20px)' : 'scale(1.1) translateX(-20px)',
    transition: 'opacity 1.5s ease-in-out, transform 8s ease',
    zIndex: active ? 1 : 0,
  });

  const gradientOverlayStyle = {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to right, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.1) 100%)',
    zIndex: 2,
  };

  const contentWrapperStyle = {
    position: 'relative',
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'left',
    padding: '0 5%',
    maxWidth: '700px',
  };

  const titleStyle = {
    fontSize: '3.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: '1rem',
    color: '#f5f5f5',
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    color: '#e0e0e0',
    marginBottom: '2rem',
    maxWidth: '600px',
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '1rem',
  };

  const buttonBase = {
    padding: '1rem 2.5rem',
    borderRadius: '9999px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontSize: '1rem',
    border: '2px solid transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  };

  const primaryButtonStyle = {
    ...buttonBase,
    backgroundColor: '#fff',
    color: '#000',
  };

  const secondaryButtonStyle = {
    ...buttonBase,
    backgroundColor: 'transparent',
    border: '2px solid #fff',
    color: '#fff',
  };

  const hoverPrimary = {
    backgroundColor: '#1E40AF', // blue-800
    color: '#fff',
  };

  const hoverSecondary = {
    backgroundColor: '#1E40AF',
    color: '#fff',
    border: '2px solid #1E40AF',
  };

  const [hoveredButton, setHoveredButton] = useState('');

  return (
    <div style={containerStyle}>
      {assets.map((asset, index) => (
        <div key={asset.src} style={backgroundAssetStyle(asset.src, index === currentIndex, index)} />
      ))}

      <div style={gradientOverlayStyle} />

      <div style={contentWrapperStyle}>
        <h1 style={titleStyle}>SPO IIT Kanpur</h1>
        <p style={subtitleStyle}>
          The Student Placement Office connects students with career opportunities, recruiters, and mentors for a brighter future.
        </p>

        <div style={buttonGroupStyle}>
          <a
            href="https://placement.iitk.ac.in/"
            style={{
              ...primaryButtonStyle,
              ...(hoveredButton === 'ras' ? hoverPrimary : {}),
            }}
            onMouseEnter={() => setHoveredButton('ras')}
            onMouseLeave={() => setHoveredButton('')}
          >
            RAS Portal
          </a>
          <a
            href="https://spo.iitk.ac.in/placement-coordinators"
            style={{
              ...secondaryButtonStyle,
              ...(hoveredButton === 'contact' ? hoverSecondary : {}),
            }}
            onMouseEnter={() => setHoveredButton('contact')}
            onMouseLeave={() => setHoveredButton('')}
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}
