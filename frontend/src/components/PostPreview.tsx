import React from 'react';

import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import Tag from '../components/Tag';
import { Post } from '../lib/posts';
import { formatDate } from '../lib/time';

interface PostPreviewProps extends RouteComponentProps {
  post: Post;
}

const PostPreview: React.FC<PostPreviewProps> = ({ post, history }) => (
  <div style={{ margin: 10, display: 'grid' }} className="postPreview">
    <a
      href={`/posts/${post.id}`}
      style={{
        fontSize: 15,
        borderBottom: 'solid #d8d8d8 1px',
        marginBottom: 10
      }}
    >
      {post.title}
    </a>
    <span style={{ fontSize: 10, margin: '0 0 10px 10px' }}>
      {formatDate(post.date_published)}
    </span>
    <span style={{ fontSize: 10, marginBottom: 10 }}>{post.preview}</span>
    <div style={{ display: 'flex' }}>
      {post.tags && post.tags.map((tag, i) => <Tag text={tag} key={i} />)}
    </div>
  </div>
);

export default withRouter(PostPreview);
