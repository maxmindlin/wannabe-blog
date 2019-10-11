import React, { useState, useEffect } from 'react';

import Link from '../components/Link';

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
    <Link
      href="https://github.com/maxmindlin/wannabe-blog"
      style={{
        fontSize: 10,
        marginLeft: 'auto'
      }}
    >
      source code
    </Link>
  </div>
);

export default Header;
