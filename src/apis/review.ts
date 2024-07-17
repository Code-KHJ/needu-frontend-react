import {
  DeleteReviewDto,
  ReviewTrainingDto,
  ReviewWorkingDto,
} from '@/interface/Review';
import customAxios from './axios-config';
import { LikeDto } from '../interface/Review';

const reviewApi = {
  createWorking: async (reviewData: ReviewWorkingDto) => {
    const response = await customAxios.post(
      `/review/working/${reviewData.corp_name}`,
      reviewData
    );
    return response;
  },
  getWorkingScore: async (corpname: string) => {
    const response = await customAxios.get(`/review/working/score/${corpname}`);
    return response;
  },
  getWorkingReviews: async (corpname: string) => {
    const response = await customAxios.get(`/review/working/${corpname}`);
    return response;
  },
  getWorkingReview: async (no: string) => {
    try {
      const response = await customAxios.get(`/review/working/id/${no}`);
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  updateWorkingReview: async (no: string, reviewData: ReviewWorkingDto) => {
    try {
      const response = await customAxios.patch(
        `/review/working/id/${no}`,
        reviewData
      );
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  deleteWorkingReview: async (deleteReviewDto: DeleteReviewDto) => {
    const response = await customAxios.delete('/review/working', {
      data: deleteReviewDto,
    });
    return response;
  },
  createTraining: async (reviewData: ReviewTrainingDto) => {
    const response = await customAxios.post(
      `/review/training/${reviewData.corp_name}`,
      reviewData
    );
    return response;
  },
  getTrainingScore: async (corpname: string) => {
    const response = await customAxios.get(
      `/review/training/score/${corpname}`
    );
    return response;
  },
  getTrainingReviews: async (corpname: string) => {
    const response = await customAxios.get(`/review/training/${corpname}`);
    return response;
  },
  getTrainingReview: async (no: string) => {
    try {
      const response = await customAxios.get(`/review/training/id/${no}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  updateTrainingReview: async (no: string, reviewData: ReviewTrainingDto) => {
    try {
      const response = await customAxios.patch(
        `/review/training/id/${no}`,
        reviewData
      );
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  deleteTrainingReview: async (deleteReviewDto: DeleteReviewDto) => {
    const response = await customAxios.delete('/review/training', {
      data: deleteReviewDto,
    });
    return response;
  },
  likeReview: async (likeDto: LikeDto) => {
    const response = await customAxios.patch(`/review/like`, likeDto);
    return response;
  },
};

export default reviewApi;
