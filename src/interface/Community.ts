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
  postLikes: PostLike[];
  writer: {
    id: number;
    nickname: string;
    // @IsString()
    // user_profile: string; url??

    // @IsString()
    // user_level: string;
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
    // @IsString()
    // user_profile: string; url??

    // @IsString()
    // user_level: string;
  };
}

export interface CommentLike {
  id: number;
  comment_id: number;
  user_id: number;
  type: number;
  created_at: Date;
}
