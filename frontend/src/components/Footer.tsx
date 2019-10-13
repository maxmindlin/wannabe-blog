import React, { useState, useEffect } from 'react';

const Footer = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      fontSize: 10
    }}
  >
    <div>
      <span style={{ paddingRight: 8 }}>Github: </span>
      <a href="https://github.com/maxmindlin" target="_blank">
        maxmindlin
      </a>
    </div>
    <span style={{ padding: '0 10px 0 10px' }}>|</span>
    <div>
      <span style={{ paddingRight: 8 }}>email: </span>
      <span>maxmindlin@gmail.com</span>
    </div>
  </div>
);

export default Footer;
