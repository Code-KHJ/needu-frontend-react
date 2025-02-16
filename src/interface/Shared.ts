export type ReportDto = {
  target: string;
  target_id: number;
  user_id: number;
  report_type: string;
  comment: string;
};

export type SubscribeDto = {
  nickname: string;
  email: string;
  subscribe: boolean;
};
