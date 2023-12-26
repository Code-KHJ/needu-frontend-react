import axios from 'axios';

const userApi = {
  duplic: async (type: string, value: string) => {
    const userDuplicDto = {
      item: type,
      value: value,
    };
    const response = await axios.post(
      'http://localhost:8000/api/user/duplic',
      userDuplicDto,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.data) {
      return true;
    } else {
      return false;
    }
  },
};

export default userApi;
