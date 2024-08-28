export type NoticeCreateDto = {
  user_id: number;
  title: string;
  markdown: string;
  html: string;
  is_show: boolean;
};

export type NoticeEditDto = {
  id: number;
  user_id: number;
  title: string;
  markdown: string;
  html: string;
  is_show: boolean;
};

export interface NoticeContent {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  is_del: boolean;
  view: number;
  noticeLikes: NoticeLike[];
  writer: {
    id: number;
    nickname: string;
    // @IsString()
    // user_profile: string; url??

    // @IsString()
    // user_level: string;
  };
}

export interface PublicNotice {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  is_del: boolean;
  view: number;
  like_cnt: number;
  comment_cnt: number;
  writer: {
    id: number;
    nickname: string;
    // @IsString()
    // user_profile: string; url??

    // @IsString()
    // user_level: string;
  };
}

export interface NoticeLike {
  id: number;
  notice_id: number;
  user_id: number;
  type: number;
  created_at: Date;
}

export interface LikeNoticeDto {
  notice_id: number;
  user_id: number;
  type: string;
}

export type NoticeCommentCreateDto = {
  post_id: number;
  user_id: number;
  content: string;
  parent_id: number | null;
};

export type NoticeCommentUpdateDto = {
  comment_id: number;
  user_id: number;
  content: string;
};

export type LikeNoticeCommentDto = {
  comment_id: number;
  user_id: number;
  type: string;
};
