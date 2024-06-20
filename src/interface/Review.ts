export interface Review {
  corp_name: string;
  user_id: string;
  total_score: number;
  highlight: string;
  pros: string;
  cons: string;
}

export type ReviewWorkingDto = Review & {
  start_date: string;
  end_date: string;
  career_type: string;
  hashtag: string[];
  growth_score: number;
  leadership_score: number;
  reward_score: number;
  worth_score: number;
  culture_score: number;
  worklife_score: number;
  [key: string]: string | number | null | any[];
};

export type ReviewTrainingDto = Review & {
  year: Date;
  season: string;
  cost: string;
  number_of_parcitipants: string;
  duration: string;
  growth_score: number;
  worth_score: number;
  recommend_score: number;
  supervisor_score: number;
};
