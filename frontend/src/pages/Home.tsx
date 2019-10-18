import React, { useState, useEffect } from 'react';

import { fetchAllPosts } from '../lib/posts';

import PostPreview from '../components/PostPreview';

const Home = () => {
  const [state, setState] = useState({
    posts: []
  });

  useEffect(() => {
    document.title = 'Wannabe blog';
    fetchAllPosts()
      .then(posts => setState(prevState => ({ ...prevState, posts })))
      .catch(err => console.warn(err));
  }, []);

  return (
    <div style={{ display: 'grid' }} className="textBody">
      <span style={{ marginBottom: 10 }}>
        This is my blog where I write about things I'm interested in or working
        on (generally javascript [react, node, typescript], rust, python, web
        stuff). It also serves as a testing ground for me to play with
        interesting web-app architectures and designs.
      </span>
      <span style={{ marginBottom: 20 }}>
        If you're interested in how this blog is designed, feel free to check
        out the source code. I'm planning on making progress
        tutorials/walk-throughs/brain-dumps as I work on the site - mostly for
        my own understanding, but if others find it interesting that's neat too.
      </span>
      <span style={{ marginBottom: 20, fontSize: 20, textAlign: 'center' }}>
        Recent posts
      </span>
      <div
        style={{
          display: 'grid',
          justifySelf: 'center',
          gridTemplateColumns: '400px 400px'
        }}
      >
        {state.posts.map((p, i) => (
          <PostPreview key={i} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Home;
