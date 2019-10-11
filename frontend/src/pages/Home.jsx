import React from 'react';

const Home = () => (
  <div style={{ display: 'grid' }}>
    <span style={{ marginBottom: 10 }}>
      This is my blog where I write about things I'm interested in or working on [generally 
      javascript (react, node, typescript), rust, python, etc]. It also serves as a testing ground 
      for me to play with interesting web-app architectures and designs.
    </span>
    <span>
      If you're interested in how this blog is designed, feel free to check out the source code. Im planning on making progress 
      tutorials/walk-throughs/brain-dumps as I work on the site - mostly for my own understanding, but if others find it interesting
      thats neat too.
    </span>
  </div>
);

export default Home;
