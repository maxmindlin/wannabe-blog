import axios from 'axios';

export interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  date_published: string;
  tags: string[];
  preview: string;
}

export const fetchAllTagPosts = async (tag: string): Promise<Post[]> => {
  return new Promise((res, rej) => {
    axios
      .get(`${process.env.HOST}/posts/${tag}`)
      .then(({ data }) => res(data as Post[]))
      .catch(err => {
        console.warn(err);
        rej('Failed to fetch posts');
      });
  });
};

export const fetchAllPosts = async (): Promise<Post[]> => {
  return new Promise((res, rej) => {
    axios
      .get(`${process.env.HOST}/posts`)
      .then(({ data }) => res(data as Post[]))
      .catch(err => {
        console.warn(err);
        rej('Failed to fetch posts');
      });
  });
};

export const fetchPost = async (id: number): Promise<Post> => {
  return new Promise((res, rej) => {
    axios
      .get(`${process.env.HOST}/posts/${id}`)
      .then(({ data }) => res(data as Post))
      .catch(err => {
        console.warn(err);
        rej('Failed to fetch post');
      });
  });
};
