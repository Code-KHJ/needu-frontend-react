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
