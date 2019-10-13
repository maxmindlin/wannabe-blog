import React from 'react';

import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

interface TagProps extends RouteComponentProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text, history }) => (
  <div
    style={{
      backgroundColor: '#8d52ce',
      padding: 5,
      borderRadius: 5,
      color: 'white',
      width: 'fit-content',
      margin: '10px 10px 10px 0'
    }}
    className="topicTag"
    onClick={() => {
      history.push(`/posts/tags/${text}`);
    }}
  >
    {text}
  </div>
);

export default withRouter(Tag);
