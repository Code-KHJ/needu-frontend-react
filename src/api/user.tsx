import axios from "axios";

const userApi = {
  duplic: async (type: string, value: string) => {
    if (type == "id") {
      if (value == "abc@abc.com") {
        return false;
      }
      return true;
    }
    if (type == "nickname") {
      if (value == "nick") {
        return false;
      }
      return true;
    }
  },
};

export default userApi;
