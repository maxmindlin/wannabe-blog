import React from 'react';

interface LinkProps {
  href: string;
}

const Link: React.FC<LinkProps> = ({ href, children }) => (
  <span
    style={{
      fontSize: 10
    }}
    className="link"
    onClick={() => {
      window.open(href, '_blank');
    }}
  >
    {children}
  </span>
);

export default Link;
