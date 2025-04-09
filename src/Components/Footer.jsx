import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center p-4">
      &copy; {new Date().getFullYear()} MyShop. All rights reserved.
    </footer>
  );
};

export default Footer;
