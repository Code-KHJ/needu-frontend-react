export type CommunityCreateDto = {
  user_id: number;
  title: string;
  markdown: string;
  html: string;
  topic_id: number;
};

export type CommunityEditDto = {
  id: number;
  user_id: number;
  title: string;
  markdown: string;
  html: string;
  topic_id: number;
};

export interface PostContent {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  is_del: boolean;
  blind: number;
  view: number;
  postType: string;
  topicType: string;
  commentAccepted: number | null;
  weeklyBest: number | null;
  postLikes: PostLike[];
  comment_cnt: number;
  writer: {
    id: number;
    nickname: string;
    profile_image: string | null;
    activity_points: number;
  };
}

export interface PostListItemContent {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  blind: number;
  view: number;
  postType: string;
  topicType: string;
  commentAccepted: number | null;
  like_cnt: number;
  comment_cnt: number;
  writer: {
    id: number;
    nickname: string;
    profile_image: string | null;
    activity_points: number;
  };
}

export interface WeeklyListItemContent {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  blind: number;
  view: number;
  postType: string;
  topicType: string;
  like_cnt: number;
  comment_cnt: number;
  writer: {
    id: number;
    nickname: string;
    profile_image: string | null;
    activity_points: number;
  };
}

export interface PostLike {
  id: number;
  post_id: number;
  user_id: number;
  type: number;
  created_at: Date;
}

export interface LikePostDto {
  post_id: number;
  user_id: number;
  type: string;
}

export interface LikeCommentDto {
  comment_id: number;
  user_id: number;
  type: string;
}

export type CommentCreateDto = {
  post_id: number;
  user_id: number;
  content: string;
  parent_id: number | null;
};

export type CommentUpdateDto = {
  comment_id: number;
  user_id: number;
  content: string;
};

export interface CommentContent {
  id: number;
  content: string;
  created_at: Date;
  is_del: boolean;
  blind: number;
  parent_id: number;
  commentLikes: CommentLike[];
  writer: {
    id: number;
    nickname: string;
    profile_image: string | null;
    activity_points: number;
  };
}

export interface CommentLike {
  id: number;
  comment_id: number;
  user_id: number;
  type: number;
  created_at: Date;
}

export interface CommentAcceptDto {
  post_id: number;
  comment_id: number;
}
