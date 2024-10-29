import { LoginDto, SingupDto } from "@/interface/User";
import customAxios from "./axios-config";

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
  uploadProfile: async (formData: FormData) => {
    try {
      const response = await customAxios.post("/user/profile/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getUserInfo: async () => {
    try {
      const response = await customAxios.get("/user/profile");
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getUserInfoForPublic: async (nickname: string) => {
    try {
      const response = await customAxios.get(`/user/public/${nickname}`);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  updateUserInfo: async (userData: object) => {
    try {
      const response = await customAxios.patch("/user/update/info", userData);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  updateUserPassword: async (userData: object) => {
    try {
      const response = await customAxios.patch(
        "/user/update/password",
        userData
      );
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  reqResetPassword: async (userEamil: object) => {
    try {
      const response = await customAxios.post("/user/reset/request", userEamil);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  validResetToken: async (token: string) => {
    try {
      const response = await customAxios.get(`/user/reset/valid/${token}`);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  resetPassword: async (userData: object) => {
    const response = await customAxios.patch("/user/reset/password", userData);
    return response;
  },
  getCareerList: async () => {
    try {
      const response = await customAxios.get("/user/career/list");
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  updateCareer: async (careerData: object) => {
    try {
      const response = await customAxios.patch("/user/career", careerData);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getPointLog: async () => {
    try {
      const response = await customAxios.get("/user/point/log");
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

export default userApi;
