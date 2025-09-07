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
    }, 5000); // 5s per slide
    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    height: '90vh',
    position: 'relative',
    overflow: 'hidden',
  };

  const backgroundAssetStyle = (src, active) => ({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: active ? 1 : 0,
    transform: active ? 'scale(1.05)' : 'scale(1.1)',
    transition: 'opacity 1.5s ease-in-out, transform 8s ease',
    zIndex: active ? 1 : 0,
  });

  const gradientOverlayStyle = {
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0) 50%),
                 linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0) 50%)`,
    zIndex: 2,
  };

  const contentWrapperStyle = {
    position: 'relative',
    zIndex: 3,
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

  const [isHovered, setIsHovered] = useState(false);

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
      {assets.map((asset, index) => (
        <div key={asset.src} style={backgroundAssetStyle(asset.src, index === currentIndex)} />
      ))}

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
