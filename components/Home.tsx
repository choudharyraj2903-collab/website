'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [currentAsset, setCurrentAsset] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const assets = [
    { src: '/homeAssets/image1.jpg', type: 'image' },
    { src: '/homeAssets/image2.jpg', type: 'image' },
  ];

  useEffect(() => {
    let currentIndex = 0;
    setCurrentAsset(assets[currentIndex].src);

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % assets.length;
      setCurrentAsset(assets[currentIndex].src);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    height: '90vh',
    position: 'relative',
    overflow: 'hidden',
  };

  const backgroundAssetStyle = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 1000ms ease-in-out',
    backgroundImage: `url(${currentAsset})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const gradientOverlayStyle = {
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0) 50%),
                 linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0) 50%)`,
    zIndex: 5,
  };

  const contentWrapperStyle = {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    padding: '1rem',
  };

  const titleStyle = {
    fontSize: '5rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    marginBottom: '2rem',
    fontFamily: 'Cinzel, serif',
    color: '#fff',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
  };

  const watchNowButtonStyle = {
    backgroundColor: isHovered ? '#6A0DAD' : '#fff',
    color: isHovered ? '#fff' : '#000',
    padding: '1.25rem 4rem',
    borderRadius: '9999px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontSize: '1rem',
    transition: 'background-color 300ms ease, color 300ms ease',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundAssetStyle} />

      <div style={gradientOverlayStyle} />

      <div style={contentWrapperStyle}>
        <h1 style={titleStyle}>SPO IIT KANPUR</h1>
        <a
          href="https://placement.iitk.ac.in/"
          style={watchNowButtonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          RAS PORTAL
        </a>
      </div>
    </div>
  );
}
