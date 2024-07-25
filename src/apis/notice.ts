import { NoticeCreateDto, NoticeEditDto } from "@/interface/Notice";
import customAxios from "./axios-config";

const noticeApi = {
  createNotice: async (createDto: NoticeCreateDto) => {
    try {
      const response = await customAxios.post("/notice", createDto);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getNoticeForEdit: async (noticeId: number) => {
    try {
      const response = await customAxios.get(`/notice/edit/${noticeId}`);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  updateNotice: async (editDto: NoticeEditDto) => {
    try {
      const response = await customAxios.patch(
        `/notice/edit/${editDto.id}`,
        editDto
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

export default noticeApi;
