'use client';

import React, { useState, useEffect } from 'react';

// This is the main App component that will render the home page.
export default function Home() {
  const [currentAsset, setCurrentAsset] = useState('');
  const [assetType, setAssetType] = useState('image');

  // We are using a list of static asset URLs here. In a real Next.js app,
  // you would fetch these from an API or a pre-built list.
  const assets = [
    { src: '/homeAssets/image1.jpg', type: 'image' },
    { src: '/homeAssets/image2.jpg', type: 'image' },
  ];

  useEffect(() => {
    // Set the initial asset
    let currentIndex = 0;
    setCurrentAsset(assets[currentIndex].src);
    setAssetType(assets[currentIndex].type);

    // Set up the interval to change the asset every 10 seconds (10000 ms)
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % assets.length;
      setCurrentAsset(assets[currentIndex].src);
      setAssetType(assets[currentIndex].type);
    }, 10000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'black',
  };

  const backgroundAssetStyle = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 1000ms ease-in-out',
  };

  const imageBackgroundStyle = {
    ...backgroundAssetStyle,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${currentAsset})`,
  };

  const overlayStyle = {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'black',
    opacity: 0.3,
  };

  const contentWrapperStyle = {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    color: 'white',
    textAlign: 'center',
    padding: '1rem',
  };

  const subtitleStyle = {
    fontSize: '0.875rem',
    fontWeight: 300,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem',
    fontFamily: 'Georgia, serif',
    color: 'rgba(255, 255, 255, 0.8)',
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 300,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '1rem',
    fontFamily: 'Cinzel, serif',
  };

  const watchNowButtonStyle = {
    backgroundColor: 'white',
    color: 'black',
    padding: '1rem 3rem',
    borderRadius: '9999px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontSize: '0.875rem',
    transition: 'background-color 300ms ease',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      {/* Background Asset */}
      {assetType === 'video' ? (
        <video key={currentAsset} autoPlay muted loop playsInline style={backgroundAssetStyle}>
          <source src={currentAsset} type="video/mp4" />
          Your browser does not support the video tag. Please check.
        </video>
      ) : (
        <div style={imageBackgroundStyle} />
      )}

      {/* Video Overlay for better text readability */}
      {assetType === 'video' && <div style={overlayStyle} />}

      {/* Content */}
      <div style={contentWrapperStyle}>
        <p style={subtitleStyle}>Rolls-Royce Motor Car Presents</p>
        <h1 style={titleStyle}>Voice of the Maker</h1>
        <p style={subtitleStyle}>An Inspiring Greatness Series</p>
        <button style={watchNowButtonStyle}>Watch Now</button>
      </div>
    </div>
  );
}
