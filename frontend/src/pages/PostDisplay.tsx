import React, { useState, useEffect } from 'react';

import ReactMarkdown from 'react-markdown';

import CodeBlock from '../components/CodeBlock';
import Tag from '../components/Tag';
import { fetchPost, Post } from '../lib/posts';
import { formatDate } from '../lib/time';

interface RouterProps {
  match: any;
}

const PostDisplay: React.FC<RouterProps> = ({ match }) => {
  const [state, setState] = useState({
    post: {} as Post
  });

  const updatePost = () => {
    fetchPost(match.params.id)
      .then(data => {
        console.log(data);
        setState(prevState => ({ ...prevState, post: data }));
      })
      .catch(err => {
        console.warn(err);
      });
  };

  useEffect(() => {
    updatePost();
  }, []);

  return (
    <div>
      <div style={{ display: 'grid' }}>
        <span style={{ fontSize: 25 }}>{state.post.title}</span>
        <span style={{ fontSize: 12, margin: '10px 0 10px 15px' }}>
          {state.post.date_published
            ? formatDate(state.post.date_published)
            : ''}
        </span>
      </div>
      <div style={{ display: 'flex' }}>
        {state.post.tags &&
          state.post.tags.map((tag, i) => <Tag text={tag} key={i} />)}
      </div>
      <div className="textBody">
        <ReactMarkdown
          source={state.post.content}
          renderers={{ code: CodeBlock }}
        />
      </div>
    </div>
  );
};

export default PostDisplay;
