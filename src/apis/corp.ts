import customAxios from './axios-config';

const corpApi = {
  getWithWorking: async (name: string) => {
    try {
      const response = await customAxios.get(`/corp/working/${name}`);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

export default corpApi;
