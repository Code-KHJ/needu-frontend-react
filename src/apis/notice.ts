import {
  LikeNoticeCommentDto,
  LikeNoticeDto,
  NoticeCommentCreateDto,
  NoticeCreateDto,
  NoticeEditDto,
} from "@/interface/Notice";
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
  getNotice: async (noticeId: number) => {
    try {
      const response = await customAxios.get(`/notice/${noticeId}`);
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
  deleteNotice: async (noticeId: number) => {
    try {
      const response = await customAxios.delete(`/notice/${noticeId}`);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  updateView: async (noticeId: number) => {
    try {
      const response = await customAxios.patch(`/notice/view/${noticeId}`);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  updateNoticeLike: async (likeDto: LikeNoticeDto) => {
    try {
      const response = await customAxios.patch(
        `/notice/like/${likeDto.notice_id}`,
        likeDto
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  createComment: async (createDto: NoticeCommentCreateDto) => {
    try {
      const response = await customAxios.post("/notice/comment", createDto);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getComments: async (noticeId: number) => {
    try {
      const response = await customAxios.get(`/notice/${noticeId}/comments`);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  deleteComment: async (commentId: number) => {
    try {
      const response = await customAxios.delete(`/notice/comment/${commentId}`);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  updateCommentLike: async (likeDto: LikeNoticeCommentDto) => {
    try {
      const response = await customAxios.patch(
        `notice/comment/like/${likeDto.comment_id}`,
        likeDto
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

export default noticeApi;
