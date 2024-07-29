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
  writer: {
    id: number;
    nickname: string;
    // @IsString()
    // user_profile: string; url??

    // @IsString()
    // user_level: string;
  };
}

export interface LikePostDto {
  post_id: number;
  user_id: number;
  type: string;
}
