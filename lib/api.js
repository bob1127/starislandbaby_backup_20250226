// lib/api.js
import { GraphQLClient, gql } from 'graphql-request';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;
const client = new GraphQLClient(WORDPRESS_API_URL);

export const getPosts = async () => {
  const query = gql`
    {
      posts {
        nodes {
          id
          title
          slug
          content
        }
      }
    }
  `;
  
  try {
    const data = await client.request(query);
    return data.posts.nodes;
  } catch (error) {
    console.error('Error fetching posts:', error.response ? error.response.errors : error.message);
    throw error;
  }
};

export const getPostBySlug = async (slug) => {
  const query = gql`
    query($slug: String!) {
      postBy(slug: $slug) {
        id
        title
        content
      }
    }
  `;
  
  try {
    const data = await client.request(query, { slug });
    return data.postBy || null;
  } catch (error) {
    console.error('Error fetching post by slug:', error.response ? error.response.errors : error.message);
    throw error;
  }
};
