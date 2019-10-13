import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router-dom';

const Header: React.ComponentClass<{}> = withRouter(({ history }) => (
  <div
    style={{
      fontSize: 30,
      padding: '0 20px 5px 20px',
      display: 'flex',
      alignItems: 'baseline'
    }}
  >
    <span
      style={{ color: '#1f94ce' }}
      className="wannabeTitle"
      onClick={() => {
        history.push('/');
      }}
    >
      Wannabe
    </span>
    <span
      style={{
        paddingLeft: 40,
        fontSize: 10
      }}
    >
      a blog for the 1x developer
    </span>
    <span style={{ marginLeft: 'auto', fontSize: 10 }}>
      <a href="https://github.com/maxmindlin/wannabe-blog" target="_blank">
        source code
      </a>
    </span>
  </div>
));

export default Header;
