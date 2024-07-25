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
