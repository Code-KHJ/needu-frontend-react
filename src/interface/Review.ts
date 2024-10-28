import { UserCareer } from "./User";

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
  year: string;
  season: string;
  cost: number | null;
  number_of_participants: number | null;
  duration: number | null;
  growth_score: number;
  worth_score: number;
  recommend_score: number;
  supervisor_score: number;
  [key: string]: string | number | null | any[];
};

export interface ReviewContent {
  id: number;
  user_id: string;
  hashtag: number[];
  total_score: string;
  growth_score: string;
  leadership_score: string;
  reward_score: string;
  worth_score: string;
  culture_score: string;
  worklife_score: string;
  highlight: string;
  pros: string;
  cons: string;
  created_date: string;
  modified_date: string | null;
  likes: number;
  is_del: boolean | null;
  blind: number;
  userCareer: UserCareer;
  corpname: string;
  [key: string]: any;
}

export interface ReviewTrainingContent {
  id: number;
  user_id: string;
  year: string;
  season: string;
  cost: number;
  number_of_participants: number;
  duration: number;
  total_score: string;
  growth_score: string;
  worth_score: string;
  recommend_score: string;
  supervisor_score: string;
  highlight: string;
  pros: string;
  cons: string;
  created_date: string;
  modified_date: string | null;
  likes: number;
  is_del: boolean | null;
  blind: number;
  corpname: string;
  [key: string]: any;
}

export interface CommonReviewContent {
  id: number;
  highlight: string;
  created_date: string;
  total_score: string;
  corpname: string;
  year: string;
}

export interface LikeDto {
  review_no: number;
  type: string;
  action: string;
}

export interface DeleteReviewDto {
  user_id: string;
  review_no: number;
}
