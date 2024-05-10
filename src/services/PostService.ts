// src/services/PostService.ts
import axios from 'axios';
import { Post } from '../models/Post';

const BASE_URL = 'http://172.21.116.60:8080';

const PostService = {
  async findAllPosts(): Promise<Post[]> {
    const response = await axios.get(`${BASE_URL}/post/all`);
    return response.data.data;
  },

  async getPost(id: string): Promise<Post> {
    const response = await axios.get(`${BASE_URL}/post/${id}`);
    return response.data.data;
  },

  async createPost(post: Omit<Post, 'id'>): Promise<Post> {
    const response = await axios.post(`${BASE_URL}/post/create`, post);
    return response.data.data;
  },
};

export default PostService;
