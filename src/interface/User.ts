export interface User {
  id: string;
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

export type LoginDto = Pick<User, 'id' | 'password'>;

export interface UserCareer {
  no: number;
  user_id: string;
  corp_name: string;
  first_date: string;
  last_date: string;
  type: string;
  review_no: number;
}
