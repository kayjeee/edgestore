// components/Logo.js
import React from 'react';

const Logo = ({ src, alt }) => {
  return src ? (
    <img src={src} alt={alt} className="mt-2 w-24 h-24 object-cover rounded" />
  ) : (
    <p>No image available</p>
  );
};

export default Logo;
