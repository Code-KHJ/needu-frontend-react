import { CommunityCreateDto } from '@/interface/Community';
import customAxios from './axios-config';

const communityApi = {
  createPost: async (createDto: CommunityCreateDto) => {
    try {
      const response = await customAxios.post('/community/post', createDto);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  uploadImage: async (formData: FormData) => {
    try {
      const response = await customAxios.post('/community/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getTopic: async (type: number) => {
    try {
      const topic = await customAxios.get(`/community/topic/${type}`);
      return topic;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

export default communityApi;
