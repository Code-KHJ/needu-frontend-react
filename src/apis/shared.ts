import { ReportDto, SubscribeDto } from "@/interface/Shared";
import customAxios from "./axios-config";

const sharedApi = {
  getCareerType: async () => {
    try {
      const careerType = await customAxios.get("/shared/careertype");
      return careerType;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getHashtagList: async () => {
    try {
      const hashtagList = await customAxios.get("/shared/hashtag");
      return hashtagList;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  createReport: async (reportData: ReportDto) => {
    try {
      const response = await customAxios.post("/shared/report", reportData);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  subscribe: async (subscribeDto: SubscribeDto) => {
    try {
      const response = await customAxios.post(
        "/shared/subscribe",
        subscribeDto
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

export default sharedApi;
