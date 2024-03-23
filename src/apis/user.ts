import { LoginDto, SingupDto } from '@/interface/User';
import customAxios from './axios-config';

const userApi = {
  login: async (userData: LoginDto) => {
    const userLoginDto = {
      id: userData.id,
      password: userData.password,
    };
    const response = await customAxios.post('/auth/login', userLoginDto);

    ////이부분 작업 필요
    if (response.data) {
      return true;
    } else {
      return false;
    }
  },
  duplic: async (type: string, value: string) => {
    const userDuplicDto = {
      item: type,
      value: value,
    };
    const response = await customAxios.post('/user/duplic', userDuplicDto);
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
      '/user/verifyemail',
      verifyEmailDto
    );
    return response;
  },
  verifyPhone: async (phone: string) => {
    const verifyEmailDto = {
      phone: phone,
    };
    // const response = await customAxios.post(
    //   '/user/verifyemail',
    //   verifyEmailDto
    // );
    const response = {
      data: {
        status: 'completed',
        authNum: '123456',
      },
    };
    return response;
  },
  findId: async (phone: string) => {
    const response = await customAxios.post('/user/find/id', { phone: phone });
    return response;
  },
  signup: async (userData: SingupDto) => {
    const response = await customAxios.post('/user/signup', userData);
    return response;
  },
};

export default userApi;
