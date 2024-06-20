import { ReviewWorkingDto } from '@/interface/Review';
import customAxios from './axios-config';

const reviewApi = {
  createWorking: async (reviewData: ReviewWorkingDto) => {
    const response = await customAxios.post(
      `/review/working/${reviewData.corp_name}`,
      reviewData
    );
    return response;
  },
};

export default reviewApi;
