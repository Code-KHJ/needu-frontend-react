import { LoginDto, SingupDto } from "@/interface/User";
import customAxios from "./axios-config";
import { AxiosError } from "axios";

const userApi = {
  login: async (userData: LoginDto) => {
    const userLoginDto = {
      user_id: userData.user_id,
      password: userData.password,
    };
    try {
      const response = await customAxios.post("/auth/login", userLoginDto);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getMe: async () => {
    try {
      const response = await customAxios.get("/auth/me");
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  logout: async () => {
    try {
      const response = await customAxios.post("/auth/logout");
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  duplic: async (type: string, value: string) => {
    const userDuplicDto = {
      item: type,
      value: value,
    };
    const response = await customAxios.post("/user/duplic", userDuplicDto);
    if (response.data) {
      return true;
    } else {
      return false;
    }
  },
  verifyEmail: async (email: string) => {
    const verifyEmailDto = {
      email: email,
    };
    const response = await customAxios.post(
      "/user/verifyemail",
      verifyEmailDto
    );
    return response;
  },
  verifyPhone: async (phone: string) => {
    const verifyPhoneDto = {
      phone: phone,
    };
    const response = await customAxios.post(
      "/user/verifyphone",
      verifyPhoneDto
    );
    return response;
  },
  findUser: async (field: string, value: string) => {
    const response = await customAxios.post("/user/find/user", {
      field: field,
      value: value,
    });
    return response;
  },
  signup: async (userData: SingupDto) => {
    const response = await customAxios.post("/user/signup", userData);
    return response;
  },
  updatePw: async (userData: object) => {
    const response = await customAxios.put("/user/update/pw", userData);
    return response;
  },
};

export default userApi;
