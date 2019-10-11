import React, { useState, useEffect } from 'react';

import Link from './Link';

const Header = () => (
  <div
    style={{
      fontSize: 30,
      padding: '0 20px 5px 20px',
      display: 'flex',
      alignItems: 'baseline'
    }}
  >
    <span style={{ color: '#1f94ce' }}>Wannabe</span>
    <span
      style={{
        paddingLeft: 40,
        fontSize: 10
      }}
    >
      a blog for the 1x developer
    </span>
    <span style={{ marginLeft: 'auto' }}>
      <Link href="https://github.com/maxmindlin/wannabe-blog">source code</Link>
    </span>
  </div>
);

export default Header;
