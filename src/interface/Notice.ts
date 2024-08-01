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

export interface LikeNoticeDto {
  notice_id: number;
  user_id: number;
  type: string;
}

export type NoticeCommentCreateDto = {
  notice_id: number;
  user_id: number;
  content: string;
  parent_id: number | null;
};

export type LikeNoticeCommentDto = {
  comment_id: number;
  user_id: number;
  type: string;
};
