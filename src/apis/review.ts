import { ReviewTrainingDto, ReviewWorkingDto } from '@/interface/Review';
import customAxios from './axios-config';

const reviewApi = {
  createWorking: async (reviewData: ReviewWorkingDto) => {
    const response = await customAxios.post(
      `/review/working/${reviewData.corp_name}`,
      reviewData
    );
    return response;
  },
  createTraining: async (reviewData: ReviewTrainingDto) => {
    const response = await customAxios.post(
      `/review/training/${reviewData.corp_name}`,
      reviewData
    );
    return response;
  },
};

export default reviewApi;
