import React, { useState, useEffect } from 'react';

import Link from '../components/Link';

const Footer = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      fontSize: 10
    }}
  >
    <span style={{ paddingRight: 10 }}>Github: </span>
    <Link href="https://github.com/maxmindlin">maxmindlin</Link>
  </div>
);

export default Footer;
