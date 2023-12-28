export interface User {
  id: string;
  password: string;
  phonenumber: string;
  nickname: string;
  policy: boolean;
  personal_info: boolean;
  marketing_email: boolean;
  marketing_SMS: boolean;
  info_period: string;
}

export type SingupDto = User & {
  password2: string;
};

export type LoginDto = Pick<User, "id" | "password">;
