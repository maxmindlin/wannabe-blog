import React, { useState, useEffect } from 'react';

import Link from '../components/Link';

const Footer = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    fontSize: 10
  }}>
    <div>
      <span style={{ paddingRight: 8 }}>Github: </span>
      <Link href="https://github.com/maxmindlin">maxmindlin</Link>
    </div>
    <span style={{ padding: '0 10px 0 10px' }}>|</span>
    <div>
      <span style={{ paddingRight: 8 }}>email: </span>
      <span>maxmindlin@gmail.com</span>
    </div>
  </div>
);

export default Footer;
