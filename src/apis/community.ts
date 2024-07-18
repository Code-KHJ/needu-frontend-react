import customAxios from './axios-config';

const communityApi = {
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
};

export default communityApi;
