import customAxios from "./axios-config";

const communityApi = {
  uploadImage: async (formData: FormData) => {
    try {
      const response = await customAxios.post("/community/image", formData);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

export default communityApi;
