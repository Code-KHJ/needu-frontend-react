export interface User {
  user_id: string;
  password: string;
  phonenumber: string;
  nickname: string;
  policy: boolean;
  personal_info: boolean;
  marketing_email: boolean;
  marketing_SMS: boolean;
}

export type SingupDto = User & {
  password2: string;
};

export type LoginDto = Pick<User, "user_id" | "password">;

export interface UserCareer {
  id: number;
  user_id: string;
  corp_name: string;
  first_date: string;
  last_date: string;
  type: string;
  review_no: number;
}

export interface UserProfile {
  user_id: string;
  nickname: string;
  phonenumber: string;
  google: boolean;
  kakao: boolean;
  profile_image: string;
  activity_points: number;
}
