import React, { useState, useEffect } from 'react';

import { fetchAllTagPosts } from '../lib/posts';

import PostPreview from '../components/PostPreview';

interface RouterProps {
  match: any;
}

const PostList: React.FC<RouterProps> = ({ match }) => {
  const [state, setState] = useState({
    posts: []
  });

  useEffect(() => {
    fetchAllTagPosts(match.params.tag)
      .then(posts => setState(prevState => ({ ...prevState, posts })))
      .catch(err => console.warn(err));
  }, []);

  return (
    <div style={{ display: 'flex', justifySelf: 'center' }}>
      {state.posts.map((p, i) => (
        <PostPreview key={i} post={p} />
      ))}
    </div>
  );
};

export default PostList;
