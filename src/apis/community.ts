import {
  CommentCreateDto,
  CommunityCreateDto,
  CommunityEditDto,
  LikeCommentDto,
  LikePostDto,
} from "@/interface/Community";
import customAxios from "./axios-config";

const communityApi = {
  createPost: async (createDto: CommunityCreateDto) => {
    try {
      const response = await customAxios.post("/community/post", createDto);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getPostForEdit: async (postId: number) => {
    try {
      const response = await customAxios.get(`/community/post/edit/${postId}`);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getPost: async (postId: number) => {
    try {
      const response = await customAxios.get(`/community/post/${postId}`);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  updatePost: async (editDto: CommunityEditDto) => {
    try {
      const response = await customAxios.patch(
        `/community/post/edit/${editDto.id}`,
        editDto
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  deletePost: async (postId: number) => {
    try {
      const response = await customAxios.delete(`/community/post/${postId}`);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  updateView: async (postId: number) => {
    try {
      const response = await customAxios.patch(
        `/community/post/view/${postId}`
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  updatePostLike: async (likeDto: LikePostDto) => {
    try {
      const response = await customAxios.patch(
        `community/post/like/${likeDto.post_id}`,
        likeDto
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  createComment: async (createDto: CommentCreateDto) => {
    try {
      const response = await customAxios.post("community/comment", createDto);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getComments: async (postId: number) => {
    try {
      const response = await customAxios.get(
        `community/post/${postId}/comments`
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  deleteComment: async (commentId: number) => {
    try {
      const response = await customAxios.delete(
        `/community/comment/${commentId}`
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  updateCommentLike: async (likeDto: LikeCommentDto) => {
    try {
      const response = await customAxios.patch(
        `community/comment/like/${likeDto.comment_id}`,
        likeDto
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  uploadImage: async (formData: FormData) => {
    try {
      const response = await customAxios.post("/community/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getTopic: async (type: number) => {
    try {
      const topic = await customAxios.get(`/community/topic/${type}`);
      return topic;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

export default communityApi;
