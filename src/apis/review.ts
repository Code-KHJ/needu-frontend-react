import {
  DeleteReviewDto,
  ReviewTrainingDto,
  ReviewWorkingDto,
} from "@/interface/Review";
import { AxiosError } from "axios";
import { LikeDto } from "../interface/Review";
import customAxios from "./axios-config";

const reviewApi = {
  createWorking: async (reviewData: ReviewWorkingDto) => {
    try {
      const response = await customAxios.post(
        `/review/working/${reviewData.corp_name}`,
        reviewData
      );
      return response;
    } catch (error) {
      console.error(error);
      return (error as AxiosError).response;
    }
  },
  getWorkingScore: async (corpname: string) => {
    try {
      const response = await customAxios.get(
        `/review/working/score/${corpname}`
      );
      return response;
    } catch (error) {
      console.error(error);
      return (error as AxiosError).response;
    }
  },
  getWorkingReviews: async (corpname: string) => {
    try {
      const response = await customAxios.get(`/review/working/${corpname}`);
      return response;
    } catch (error) {
      console.error(error);
      return (error as AxiosError).response;
    }
  },
  getWorkingReview: async (no: string) => {
    try {
      const response = await customAxios.get(`/review/working/id/${no}`);
      return response;
    } catch (error) {
      console.error(error);
      return (error as AxiosError).response;
    }
  },
  getWorkingReviewByRecent: async () => {
    try {
      const response = await customAxios.get("/review/working/recent");
      return response;
    } catch (error) {
      console.error(error);
      return (error as AxiosError).response;
    }
  },
  getWorkingReviewsByUser: async () => {
    try {
      const response = await customAxios.get("/review/working/user");
      return response;
    } catch (error) {
      console.error(error);
      return error;
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
      return (error as AxiosError).response;
    }
  },
  deleteWorkingReview: async (deleteReviewDto: DeleteReviewDto) => {
    try {
      const response = await customAxios.delete("/review/working", {
        data: deleteReviewDto,
      });
      return response;
    } catch (error) {
      console.error(error);
      return (error as AxiosError).response;
    }
  },
  createTraining: async (reviewData: ReviewTrainingDto) => {
    try {
      const response = await customAxios.post(
        `/review/training/${reviewData.corp_name}`,
        reviewData
      );
      return response;
    } catch (error) {
      console.error(error);
      return (error as AxiosError).response;
    }
  },
  getTrainingScore: async (corpname: string) => {
    try {
      const response = await customAxios.get(
        `/review/training/score/${corpname}`
      );
      return response;
    } catch (error) {
      console.error(error);
      return (error as AxiosError).response;
    }
  },
  getTrainingReviews: async (corpname: string) => {
    try {
      const response = await customAxios.get(`/review/training/${corpname}`);
      return response;
    } catch (error) {
      console.error(error);
      return (error as AxiosError).response;
    }
  },
  getTrainingReview: async (no: string) => {
    try {
      const response = await customAxios.get(`/review/training/id/${no}`);
      return response;
    } catch (error) {
      console.error(error);
      return (error as AxiosError).response;
    }
  },
  getTrainingReviewByRecent: async () => {
    try {
      const response = await customAxios.get("/review/training/recent");
      return response;
    } catch (error) {
      console.error(error);
      return (error as AxiosError).response;
    }
  },
  getTrainingReviewsByUser: async () => {
    try {
      const response = await customAxios.get("/review/training/user");
      return response;
    } catch (error) {
      console.error(error);
      return error;
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
      return (error as AxiosError).response;
    }
  },
  deleteTrainingReview: async (deleteReviewDto: DeleteReviewDto) => {
    try {
      const response = await customAxios.delete("/review/training", {
        data: deleteReviewDto,
      });
      return response;
    } catch (error) {
      console.error(error);
      return (error as AxiosError).response;
    }
  },
  likeReview: async (likeDto: LikeDto) => {
    try {
      const response = await customAxios.patch(`/review/like`, likeDto);
      return response;
    } catch (error) {
      console.error(error);
      return (error as AxiosError).response;
    }
  },
};

export default reviewApi;
