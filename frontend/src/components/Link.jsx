import React from 'react';

const Link = ({ href, children, style }) => (
  <span 
    style={style}
    className="link"
    onClick={() => {
      window.open(href, "_blank")
    }}
  >
    {children}
  </span>
)

export default Link;