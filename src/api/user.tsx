import axios from "axios";

const userApi = {
  duplic: async (type, value) => {
    console.log(value);
    // const res = await axios.post("https://", payload);
    // const result = res.data;
    return value;
  },
};

export default userApi;
